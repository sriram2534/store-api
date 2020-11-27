const DBClient = require('./db')
const createResponse = require('./responseUtil')

module.exports = { DBClient, ...createResponse }
