import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api';
import mongoose from 'mongoose';
import Replay from './models/replay';
require('dotenv').config();

mongoose.connect("mongodb://jared:h@ds121483.mlab.com:21483/pogtracker-dev",{
  useMongoClient : true
});

const app = express();
const port = 8080;
let server;

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use((req, res, next) => {
  console.log("biiiiiiitch")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get(/^(?!\/api(\/|$))/, (req, res) => {
//     console.log("why am I in here")
//     const index = path.resolve(__dirname, '../client/build', 'index.html');
//     res.sendFile(index);
// });

app.use('/api', router);

function runServer(port=8080) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve();
    }).on('error', reject);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if(require.main === module){
  runServer();
}

module.exports = {
    app, runServer, closeServer
};

