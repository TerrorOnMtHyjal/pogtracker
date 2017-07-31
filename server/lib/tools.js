import defaultEmotes from './data';
import rp from 'request-promise';

const TWITCH_INTERVAL = 30;
const REPLAY_OFFSET = 15;

function parseChat(videoID){
  let startTime, 
      endTime, 
      currentTime, 
      formattedLibrary;
  let parsedData = {};

  const initialOptions = {
    uri: 'https://api.twitch.tv/kraken/videos/' + videoID,
    headers: {
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    },
    json: true
  };

  return rp(initialOptions)
  .then(data => {
    //capture necessary replay data to generate timestamps in next promise
    startTime = ((new Date(data.recorded_at)).getTime()) / 1000;
    endTime = startTime + data.length;
    currentTime = startTime;

    parsedData.channelData = {
      name : data.channel.name,
      displayName : data.channel.display_name,
      api : data._links.channel
    };

    parsedData.replayData = {
      title : data.title,
      url : data.url,
      length : data.length,
      recordedAt: data.recorded_at,
      game: data.game
    };

    const productRequestOptions = {
      uri: `https://api.twitch.tv/api/channels/${parsedData.channelData.name}/product`,
      headers: {
        'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
      },
      json: true
    };

    return rp(productRequestOptions)
  })
  .then(productData => {

    if(productData.subsonly){
      parsedData.channelData.emotes = {};
      
      productData.emoticons.forEach(({ id, state, regex }) => {

        if(state === "Active"){
          parsedData.channelData.emotes[regex] = {
            code: regex,
            id
          }
        }
      })
    }

    const requests = [];

    while(currentTime <= endTime){
      const requestOptions = {
        uri: 'https://rechat.twitch.tv/rechat-messages?&start='+currentTime+"&video_id=v"+videoID,
        headers: {
          'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
        },
        json: true
      };

      requests.push(rp(requestOptions));

      currentTime += TWITCH_INTERVAL;
    }
    
    return Promise.all(requests);
  })
  .then(chatChunks => {
    console.log("Whew! Promise.all successful!")

    const library = makeLibrary(chatChunks, parsedData.channelData.emotes && parsedData.channelData.emotes);
    formattedLibrary = formatLibrary(library);


    const channelOptions = {
      uri: parsedData.channelData.api,
      headers: {
        'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
      },
      json: true
    };

    console.log("One last call to make. Need that streamer image!")
    return rp(channelOptions)
  })
  .then(channelData => {
    console.log("Image get! Bundling it up.");

    parsedData.channelData.logo = channelData.logo;
    parsedData.library = formattedLibrary;

    return parsedData;
  })
  .catch(err => {
    console.log(err);
  });
}


function makeLibrary(chunks, channelEmotes){
  //library will hold keys with the name of emotes used
  //the value will be an array of arrays, each subarray representing
  //a 30 second chunk of chat time
  const library = {};
  const clonedDefaults = JSON.parse(JSON.stringify(defaultEmotes));
  const clonedChannel = JSON.stringify(channelEmotes);
  const fullEmotes = Object.assign({}, clonedDefaults, clonedChannel);
  console.log(fullEmotes);
  //for every 30 seconds chunk of chat
  //analyze each post
  //check each post string for every emote
  //if an emote is found, track it as a key in emoteTracker
  //insert the currently tracked emotes into the library
  //before moving on to the next chat chunk
  chunks.forEach(chunk => {
    const emoteTracker = {};

    chunk.data.forEach(post => {
      const moment = Math.floor(post.attributes["video-offset"] / 1000) - REPLAY_OFFSET;
      for(let emote in fullEmotes){

        if(post.attributes.message.includes(emote)){
          !emoteTracker[emote] && (emoteTracker[emote] = {
            emoteName : emote,
            imgID : fullEmotes[emote].id,
            moments : []
          });

          emoteTracker[emote].moments.push(moment)
        }
      }

      // emoteNames.forEach(emoteName => {
      //   if(post.attributes.message.includes(emoteName)){
      //     !emoteTracker[emoteName] 
      //       ? 
      //         emoteTracker[emoteName] = [postOffsetTime] 
      //       : 
      //         emoteTracker[emoteName].push(postOffsetTime)
      //   }          
      // });
    });

    for(let emote in emoteTracker){
      !library[emote] 
        ? 
          library[emote] = [emoteTracker[emote]] 
        : 
          library[emote].push(emoteTracker[emote])
    }
  });

  return library;
}

function formatLibrary(library){
  const formattedLibrary = {
    mostUsed : "",
    emotes : []
  };
  
  let mostUsedTracker = {
    emote : "default",
    count : 0
  }

  for(let emote in library){
    const chunks = library[emote];
    const topChunks = chunks.sort((a, b) => b.length - a.length).slice(0, 10);
    const moments = topChunks.map(chunk => Math.min(...chunk));
    let avg, count = 0;
    

    chunks.forEach(chunk => count += chunk.length);
    avg = count / chunks.length;


    if(count > mostUsedTracker.count){
      mostUsedTracker = {
        emote,
        count
      }
    } 

    formattedLibrary.emotes.push({
      name: emote,
      count,
      moments
    });
  }

  formattedLibrary.mostUsed = mostUsedTracker.emote;

  return formattedLibrary;
}

export { parseChat };