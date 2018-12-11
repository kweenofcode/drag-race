const Game = require('../models/Game')

module.exports = async(req, res, next) => {
  const { id } = req.token.game
  try {
    const doc = await Game.findById(id).populate({ path: 'users', populate: { path: 'kweens', populate: { path: "points " } } })
    if (!doc) return next(new Error('not found'))
    req.game = doc
    next()
  } catch(e) {
    next(e)
  }
}