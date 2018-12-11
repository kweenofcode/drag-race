const express = require('express')
const router = express.Router()

const tokenService = require('../utils/tokenService')
const User = require('../models/User')

router.post('/', async (req, res, next) => {
  try {
    const { name, password, game } = req.body;
    const doc = new User({ name, password })
    await doc.save()
    const user = doc
    const token = await tokenService.create(user, game)
    res.status(201).send({
      data: [token]
    })
  } catch (e) {
    next(e)
  }
})

router.post('/unique', async(req, res, next) => {
  const { name } = req.body
  try {
    const doc = await User.findOne({ name })
    res.status(200).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

module.exports = router