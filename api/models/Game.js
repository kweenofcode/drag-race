const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  password: {
    type: String,
    required: true,
  },
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  kweens: [{ type: Schema.Types.ObjectId, ref: 'Kween' }],
  rules: [{ type: Schema.Types.ObjectId, ref: 'Rule' }],
})

gameSchema.pre('save', async function (next) {
  const game = this
  if (game.isModified('password') || game.isNew) {
    try {
      const hash = await bcrypt.hash(game.password, 10)
      game.password = hash
      next()
    } catch (e) {
      next(e)
    }
  } else {
    next()
  }
})

gameSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Game', gameSchema)