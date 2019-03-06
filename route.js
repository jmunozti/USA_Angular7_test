'use strict';
class Route {
  // dynamically include controllers
  constructor() {
    const fs = require('fs');

    return (dirname, server) => {

      const files = fs.readdirSync(dirname);

      files.forEach((file) => {

        const filepath = dirname + '/' + file;

        if (fs.statSync(filepath).isDirectory()) {
          route(filepath, server);
        } else {
          const controller = require(filepath);
          controller.route(server);
        }

      });
    };
  }

}
module.exports = new Route();