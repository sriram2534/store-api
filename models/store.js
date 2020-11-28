const mongoose = require('mongoose')
const crypto = require('crypto')
const { Schema } = mongoose

const getId = () => {
  const id = crypto.randomBytes(8).toString('hex')
  return id
}

const storeDetailSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: getId,
  },
  store_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  updated_at: {
    type: Date,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    enum: ['US'],
  },
  latitude: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  longitude: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  features: {
    type: [String],
    enum: ['pickup', 'delivery'],
  },
  phone: {
    type: String,
    validate: {
      validator: function (phone) {
        return phone.length === 10
      },
      message: 'phone number length should be 10 number',
    },
  },
  created_at: {
    type: Date,
  },
  county: {
    type: String,
  },
  time_zone: {
    type: String,
  },
})

function getStoreDetailsModal() {
  if (mongoose.models && mongoose.models.storeDetails) {
    return mongoose.models.storeDetails
  } else {
    return mongoose.model('storeDetails', storeDetailSchema)
  }
}

module.exports = getStoreDetailsModal()
