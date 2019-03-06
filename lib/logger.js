const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'audit',
  stream: process.stdout,
  serializers: bunyan.stdSerializers
})

module.exports = logger;