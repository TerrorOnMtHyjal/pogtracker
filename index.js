import express from 'express';
import proxy from 'http-proxy-middleware';

const app = express();

if(process.env.NODE_ENV === 'production'){
  console.log("ok what")
  const runServer = require('./server').runServer;

  process.chdir('server');
  runServer(process.env.PORT);

} else {
  console.log("proxying")
  app.use(proxy('http://localhost:3000/', {
    logLevel: 'warn',
    ws: true,
    router: {
      'localhost:4000/api': 'http://localhost:8080'
    }
  }));

  app.listen(4000);
}
