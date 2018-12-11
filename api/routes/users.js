const express = require('express')
const Router = express.Router
const router = Router()

const auth = require('../middleware/auth')
const user = require('../middleware/user')
const game = require('../middleware/game')

const User = require('../models/User')

router.get('/', async (req, res, next) => {
    try {
      const docs = await User.find({}).populate({path: 'kweens', populate : {path: 'points'}})
      res.status(200).send({
        data: docs
      })
    } catch(e) {
      next(e)
    }
  })

router.get('/current', auth, user, game, async (req, res, next) => {
  try {
    const { user, game } = req
    res.status(200).send({
      data:[{
        user, 
        game
      }]
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:user_id/kweens', async(req, res, next) => {
  try {
    const { kweens } = req.body
    const {user_id} = req.params
    const doc = await User.findByIdAndUpdate(user_id, { kweens } )
    res.status(200).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

router.put('/:user_id/admin', async (req, res, next) => {
  try {
    const { admin } = req.body
    const { user_id } = req.params
    const doc = await User.findByIdAndUpdate(user_id, { admin })
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:user_id', async(req, res, next) => {
  const {user_id } = req.params
  try {
    const doc = await User.findById(user_id).populate('kweens')
    res.status(200).send({
      data: doc
    })
  } catch(e) {
    next(e)
  }
})

router.delete('/:user_id', async(req, res, next) => {
  try {
    const { user_id } = req.params
    const doc = await User.findByIdAndRemove(user_id)
    res.status(201).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

module.exports = router