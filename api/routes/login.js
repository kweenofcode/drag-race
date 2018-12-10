const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', async(req, res, next) => {
  const { name, password } = req.body
  try {
    const user = await User.findOne({ name })
    if (!user) {
      return next(new Error('not found'))
    }
    const match = user.comparePassword(password)
    if (match) {
      const id = user._id
      res.status(200).send({
        data: [{ name, id }]
      })
    }
  } catch(e) {
    next(e)
  }
})

module.exports = router