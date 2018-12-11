const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kweens: [{ type: Schema.Types.ObjectId, ref: 'Kween' } ],
  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password') || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      next()
    } catch(e) {
      next(e)
    }
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)