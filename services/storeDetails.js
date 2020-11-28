const mongoose = require('mongoose')
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
  StoreDetailsModel.create(payload, function (error, result) {
    if (error) {
      return callback(error, null)
    }
    if (result) {
      return callback(null, result)
    }
  })
}

function fetchStores(payload, callback) {
  if (!payload) {
    return callback('Payload Empty', null)
  }
  StoreDetailsModel.find({}).exec(function (error, results) {
    if (error) {
      return callback(error, null)
    }
    return callback(null, results)
  })
}

function deleteStores(payload, callback) {
  if (!payload) {
    return callback('Payload Empty', null)
  }

  const deleteQuery = {
    _id: {
      $in: payload._id,
    },
  }
  StoreDetailsModel.deleteMany(deleteQuery).exec(function (error) {
    if (error) {
      return callback(error, null)
    }
    return callback(null, { status: 'Success' })
  })
}

module.exports = {
  createStore,
  fetchStores,
  deleteStores,
}
