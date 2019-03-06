'use strict';
let thisObject = null;
const examModel = require('../models/exam');

class Exam {

	constructor() {
		thisObject = this;
		return;
	}

	allowCORS(res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		return;
	}

	getAll() {
		return async (req, res, next) => {

			thisObject.allowCORS(res);
			const result = await examModel.getAll();

			if (!result.code) {
				res.send(500);
			} else {
				res.send(200, JSON.parse(result.msg));
			}

			next();

		}
	}


	route(app) {

		app.get('/api', thisObject.getAll());

		app.post('/api', examModel.add());
		//app.get('/api', examModel.getAll());
		app.get('/api/:id', examModel.get());
		app.put('/api', examModel.edit());
		app.del('/api', examModel.delete());

	}

}

module.exports = new Exam();