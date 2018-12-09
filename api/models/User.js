const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kweens: [{ type: Schema.Types.ObjectId, ref: 'Kween' } ],
  score: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('User', userSchema)