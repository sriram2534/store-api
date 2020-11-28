const _ = require('lodash')
const utils = require('../utility')
const storeService = require('../services/storeDetails')

function fetchStoresDetails(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  let logger = utils.initLogger(event, context)
  let payload = null
  try {
    let connectionPromise = utils.DBClient(null, function (error) {
      utils.createResponse(error, null, logger, callback)
    })
    try {
      payload = _.isObject(event.body) ? JSON.parse(JSON.stringify(event.body)) : JSON.parse(event.body)
      logger.info('payload: ', JSON.stringify(payload))
    } catch (error) {
      logger.error('JSON format Error')
      utils.createResponse(error, null, logger, callback)
    }
    connectionPromise.then(function () {
      storeService.fetchStores(payload, function (error, result) {
        utils.createResponse(error, result, logger, callback)
      })
    })
  } catch (error) {
    return utils.createResponse(error, null, logger, callback)
  }
}

module.exports = {
  fetchStoresDetails,
}
