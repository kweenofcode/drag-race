const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kweenSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  points: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Rule'}],
  },
  eliminated: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Kween', kweenSchema)