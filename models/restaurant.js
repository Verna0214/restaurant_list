const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurant = new Schema ({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Restaurant', restaurant)