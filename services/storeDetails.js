const StoreDetailsModel = require('../models/store')

function createStore(payload, callback) {
  if (!payload) {
    return callback('Payload Empty', null)
  }
  const created_at = new Date().toISOString()
  const updated_at = new Date().toISOString()
  payload = {
    ...payload,
    created_at,
    updated_at,
  }
  StoreDetailsModel.create(payload, function (error, doc) {
    if (error) {
      return callback(error)
    }
    if (doc) {
      return callback(null, doc)
    }
  })
}

module.exports = {
  createStore,
}
