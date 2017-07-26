import express from 'express';
import { parseChat } from '../lib/tools';

const router = express.Router();

import mongoose from 'mongoose';
import Replay from '../models/replay';

router.use((req, res, next) => {
  console.log('Server pinged. What you want?');
  next();
});

router.get('/replay/:replay_id',(req, res) => {
  Replay.findOne({ videoID: req.params.replay_id }, (err, replay) => {
    err && res.send(err) 
    console.log("Database successfully queried...");

    if(replay === null){
      
      console.log("...and I don't have that one. Working on it.")
      parseChat(req.params.replay_id)
      .then(({mostUsed, emotes}) => {

        console.log("...almost there, chat was parsed...")
        let newReplay = new Replay({
          videoID : req.params.replay_id,
          mostUsed,
          emotes
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

