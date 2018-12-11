const jwt = require('jsonwebtoken')

const {SECRET} = require('./constants')

const create = (user, game) => {
  id = user._id
  game_id = game._id
  const payload = {
    user: {
      id
    },
    game:{
      id: game_id,
    }
  }
  return jwt.sign(payload, SECRET)
}

const verify = token => jwt.verify(token, SECRET)

module.exports = {
  create,
  verify
}