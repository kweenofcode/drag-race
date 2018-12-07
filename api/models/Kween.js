const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kweenSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  points: {
    type: [Schema.Types.ObjectId],
  },
  eliminated: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Kween', kweenSchema)