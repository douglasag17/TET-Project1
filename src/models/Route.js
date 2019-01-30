const mongoose = require('mongoose')
const { Schema } = mongoose

const RouteSchema = new Schema({
  route: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Route', RouteSchema)