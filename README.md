# PogTracker
## A Twitch.tv highlight generator using chat replays from saved broadcasts

### Overview
[PogTracker](http://www.pogtracker.com) utilizes multiple Twitch.tv APIs to collect relevant replay data for a provided broadcast replay ID. Broadcast information, replay chat logs and streamer specifics are collected. Chat is analyzed for emote use, the regularity of said emotes within a thirty second timespan and timestamps are generated to reflect bursts of emote use versus an average use rate throughout the replay chat log. All generated data is stored via MongoDB for instant delivery to future users with the same broadcast ID query.

This application provides a quick and fun way to find and watch moments within a given broadcast, based on emotes used daily throughout Twitch.

## Installation

```
>   git clone https://github.com/dustwise/pogtracker.git
>   cd pogtracker
>   npm install
```

### Launching

```
>   npm run dev
```

Open `localhost:4000` in your browser of choice.

## Design & Functionality

### Frontend

React, Redux, React Router 4 and Styled-Components make up the frontend of PogTracker. The user is prompted to provide a broadcast replay ID. Upon submission, they are notified that the replay is being processed and when complete, redirected to the player page.

The player page provides the user with an embedded twitch player, a list of ordered timestamps based on the default emote "PogChamp" and an area to choose other emotes to view their respective timestamps. If the provided broadcast ID belongs to a partnered channel, all subscriber emotes for that channel are also provided.

### Backend

The backend is built on Node.js using Express, MongoDB and Mongoose. The heart of the backend lives in the `server/lib/tools.js` file, which is utilized by the api route. Here we reach out to Twitch with a number of API calls, collecting all necessary data, dehydrating and rehydrating it for storage in MongoDB. The steps are roughly lined out by thise pseudocode:

```
//  Make initial call to capture generic channel and broadcast information 
//  (broadcaster name, broadcaster ID, broadcast title, etc.) and replay start time.

//  Second call determines whether the broadcaster is partnered via their ID, capturing 
//  their custom emotes and generates promises for each chat request, based on thirty 
//  second intervals (the Twitch API limit per chat request).

//  Executes a Promise.All for every chat promise API call, passing the returned data to 
//  dehydration/hydration methods.

//  Builds and formats the emote library, removing emotes that are not used regularly and 
//  cataloging timestamps for bursts of emotes based on emote average use.

//  Returns the formatted data to be stored in MongoDB via Mongoose for future queries 
//  and to be delivered to the user.
```

## Stack
- React
- Redux
- React Router 4
- Node.js
- Mongoose
- MongoDB

## Future

- Full site redesign.
- Provide related replays to the user.
- Implement socket.io for more reliable and trackable processing requests.
- Convert to an official Twitch extension once the program has laucnhed.