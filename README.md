# PogTracker
## A Twitch.tv highlight generator using chat replays from saved broadcasts

### Overview
PogTracker utilizes multiple Twitch.tv APIs to collect relevant replay data for a provided broadcast replay ID. Broadcast information, replay chat logs and streamer specifics are collected. Chat is analyzed for emote use, the regularity of said emotes within a thirty second timespan and timestamps are generated to reflect bursts of emote use versus an average use rate throughout the replay chat log. All generated data is stored via MongoDB for instant delivery to future users with the same broadcast ID query.

This application provides a quick and fun way to find and watch moments within a given broadcast, based on emotes used daily throughout Twitch.

##Installation

```
>   git clone https://github.com/dustwise/pogtracker.git
>   cd pogtracker
>   npm install
```

###Launching

```
>   npm run dev
```

Open `localhost:4000' in your browser of choice.