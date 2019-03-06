'use strict';

let singleton = null;

class App {

  constructor() {

    if (singleton == null) {
      singleton = this.init();
    } else {
      return singleton;
    }
  }

  close(){
    singleton.close();
  }

  init() {
    const restify = require('restify'),
      logger = require('./lib/logger'),
      corsMiddleware = require('restify-cors-middleware'),
      port = 8080;

    const server = restify.createServer({
      log: logger,
      name: 'smarterweb exam'
    });

    const cors = corsMiddleware({
      preflightMaxAge: 5,
      origins: ['*'],
    })

    server.pre(cors.preflight);
    server.use(cors.actual);
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.authorizationParser());
    server.use(restify.plugins.dateParser());
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.gzipResponse());
    server.use(restify.plugins.throttle({
      burst: 100,
      rate: 50,
      ip: true, // throttle based on source ip address
      overrides: {
        '127.0.0.1': {
          rate: 0, // unlimited
          burst: 0
        }
      }
    }));

    server.on('after', restify.plugins.auditLogger({
      log: logger,
      event: 'after',
      server: server,
      printLog: true
    }));

    server.use((req, res, next) => {
      setTimeout(next.bind(this), parseInt(0, 10));
    });

    // load route
    require('./route.js')(__dirname + '/controllers', server);

    logger.info('Starting');
    // start server
    server.listen(port, function startServer() {
      logger.info('%s listening at %s', server.name, server.url);
    });

    return server;
  }
}


module.exports = new App();