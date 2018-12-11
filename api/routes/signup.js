const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const doc = new User({ name, password })
    await doc.save()
    const { _id } = doc
    res.status(201).send({
      data: [{ _id, name }]
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