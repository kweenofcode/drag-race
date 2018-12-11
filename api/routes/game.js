const express = require('express')
const router = express.Router()
const Game = require('../models/Game')

router.get('/', async(req, res, next) => {
  try {
    const doc = await Game.find({}).populate({ path: 'users', populate: { path: 'kweens', populate: { path: "points " }}})
    res.status(200).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
});

router.post('/', async(req, res, next) => {
  const {name , password } = req.body
  try {
    const game = new Game({name, password})
    const { _id } = await game.save()
    res.status(201).send({
      data: [{_id, name}]
    })
  } catch(e) {
    next(e)
  }
})

router.post('/join', async(req, res, next) => {
  const { name, password } = req.body
  try {
    const game = await Game.findOne({ name }).populate({ path: 'users', populate: { path: 'kweens', populate: { path: "points " } } })
    if (!game) {
      return next(new Error('not found'))
    }
    const match = game.comparePassword(password)
    if (match) {
      const {_id, users} = game
      res.status(200).send({
        data: [{ name, _id, users }]
      })
    }
  } catch (e) {
    next(e)
  }

})

router.put('/:game_id/player', async(req, res, next) => {
  const { users } = req.body
  const { game_id } = req.params
  try {
    const doc = await Game.findByIdAndUpdate(game_id, { users })
    res.status(201).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})


module.exports = router