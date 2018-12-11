const express = require('express')
const router = express.Router()
const User = require('../models/User')
const tokenService = require('../utils/tokenService')

router.post('/', async(req, res, next) => {
  const { name, password, game } = req.body
  try {
    const user = await User.findOne({ name })
    if (!user) {
      return next(new Error('unauthorized'))
    }
    const match = await user.comparePassword(password)
    if (match) {
      const token = tokenService.create(user, game)
      res.status(200).send({
        data: [token]
      })
    } else {
      next(new Error('unauthorized'))
    }
  } catch(e) {
    next(e)
  }
})

module.exports = router