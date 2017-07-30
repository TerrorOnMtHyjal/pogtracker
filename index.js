import express from 'express';
import proxy from 'http-proxy-middleware';

const app = express();

if(process.env.NODE_ENV === 'production'){
  const runServer = require('./server').runServer;

  process.chdir('server');
  runServer(process.env.PORT);

} else {
  app.use(proxy('http://localhost:3000/', {
    logLevel: 'warn',
    ws: true,
    router: {
      '/api': 'http://localhost:8080'
    }
  }));

  app.listen(4000);
}