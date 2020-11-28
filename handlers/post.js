const _ = require('lodash')
const utils = require('../utility')
const storeService = require('../services/storeDetails')

function createStoreDetails(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  let logger = utils.initLogger(event, context)
  let payload = null
  try {
    let connectionPromise = utils.DBClient(null, function (error) {
      return utils.createResponse(error, null, logger, callback)
    })
    try {
      payload = _.isObject(event.body) ? JSON.parse(JSON.stringify(event.body)) : JSON.parse(event.body)
      logger.info('payload: ', JSON.stringify(payload))
    } catch (error) {
      logger.error('JSON format Error')
      return utils.createResponse(error, null, logger, callback)
    }
    connectionPromise
      .then(function () {
        storeService.createStore(payload, function (error, result) {
          utils.createResponse(error, result, logger, callback)
        })
      })
      .catch(error => {
        return utils.createResponse(error, null, logger, callback)
      })
  } catch (error) {
    callback(null, utils.createResponse(error, null, logger, stats, callback))
  }
}

function updateStoreDetails(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  let logger = utils.initLogger(event, context)
  try {
    let connectionPromise = utils.DBClient(null, function (error) {
      return utils.createResponse(error, null, logger, callback)
    })
  } catch (error) {
    callback(null, utils.createResponse(error, null, logger, stats, callback))
  }
}

function deleteStoreDetails(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  let logger = utils.initLogger(event, context)
  let payload = null
  try {
    let connectionPromise = utils.DBClient(null, function (error) {
      return utils.createResponse(error, null, logger, callback)
    })
    try {
      payload = _.isObject(event.body) ? JSON.parse(JSON.stringify(event.body)) : JSON.parse(event.body)
      logger.info('payload:', payload)
    } catch (error) {
      return utils.createResponse(error, null, logger, callback)
    }
    connectionPromise.then(function () {
      storeService.deleteStores(payload, function (error, results) {
        return utils.createResponse(error, results, logger, callback)
      })
    })
  } catch (error) {
    callback(null, utils.createResponse(error, null, logger, stats, callback))
  }
}

module.exports = {
  createStoreDetails,
  updateStoreDetails,
  deleteStoreDetails,
}
