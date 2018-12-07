const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kweens: [Schema.Types.ObjectId],
  score: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('User', userSchema)