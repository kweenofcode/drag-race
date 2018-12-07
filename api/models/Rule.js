const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ruleSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  points: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Rule', ruleSchema);