'use strict';

const request = require('request');
const url = 'https://examen-sw.herokuapp.com/users';

class Exam {

  add() {
    return (req, res, next) => {
      console.log('add', req.params, req.body);

      if (req.body == undefined || !req.body || 0 == Object.getOwnPropertyNames(req.body).length) {
        res.send(400);
        return;
      }

      res.setHeader('Access-Control-Allow-Origin', '*');

      request.post({
        'headers': {
          'content-type': 'application/json'
        },
        'url': 'https://examen-sw.herokuapp.com/users',
        'body': JSON.stringify(req.body)
      }, (error, response, body) => {

        if (error) {
          console.dir(error);
          res.send(500);
        } else {
          res.send(201, JSON.parse(body));
        }

      });

      next();

    }
  }

   getAll() {
    return new Promise(resolve => {
      request.get(url, (error, response, body) => {

        if (error) {
          resolve( {code:false, msg: error});
        } else {
          resolve( {code:true, msg: body});
        }

      });

    });

  }

  getAll2() {
    return (req, res, next) => {

      console.log('getAll');
      res.setHeader('Access-Control-Allow-Origin', '*');
      request.get('https://examen-sw.herokuapp.com/users', (error, response, body) => {

        if (error) {
          console.dir(error);
          res.send(500);
        } else {
          res.send(200, JSON.parse(body));
        }

      });

      next();

    }
  }

  get() {
    return (req, res, next) => {

      console.log('get', req.params.id);
      res.setHeader('Access-Control-Allow-Origin', '*');
      request.get('https://examen-sw.herokuapp.com/users/' + req.params.id, (error, response, body) => {

        if (error) {
          console.dir(error);
          res.send(500);
        } else {
          res.send(200, JSON.parse(body));
        }

      });

      next();

    }
  }

  edit() {
    return (req, res, next) => {
      console.log('edit');
      res.send(200);
      next();

    }
  }

  delete() {
    return (req, res, next) => {
      console.log('delete');
      res.send(200);
      // if error ==> 204 No Content 
      next();

    }
  }

}

module.exports = new Exam();