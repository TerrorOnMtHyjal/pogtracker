import express from 'express';
import { parseChat } from '../lib/tools';

const router = express.Router();

import mongoose from 'mongoose';
import Replay from '../models/replay';

router.use((req, res, next) => {
  console.log("request", req);
  next();
});

//callback hell you shitheel
router.get('/api/replay/:replay_id',(req, res) => {
  console.log("why am I not getting to here?")
  Replay.findOne({ videoID: req.params.replay_id }, (err, replay) => {
    err && res.send(err)
    console.log("Database successfully queried...");
    //send back 202, stating that request for replay analysis has been accepted
    //future requests for the same replay with detect an empty document that exists
    //user will be prompted in both cases to recheck in a few moments
    if(replay === null){

      console.log("...and I don't have that one. Working on it.")
      parseChat(req.params.replay_id)
      .then(({replayData, channelData, library}) => {
        console.log("...almost there, chat was parsed...")
        let newReplay = new Replay({
          videoID : req.params.replay_id,
          library,
          channelData,
          replayData
        });

        newReplay.save((err, replay) => {
          err && res.send(err);
          console.log("...Sending it your way Boss!")
          res.send(replay);
        });

      });
    } else {
      console.log("...and that one's already done! Here you go.")
      res.send(replay);
    }
  });
});

export default router;

