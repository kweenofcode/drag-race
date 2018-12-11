const User = require('../models/User')

module.exports = async(req, res, next) => {
  const { id } = req.token.user
  try {
    const doc = await User.findById(id).populate({ path: 'kweens', populate: { path: 'points' } })
    if (!doc) return next(new Error('not found'))
    req.user = doc
    next()
  } catch(e) {
    next(e)
  }
}