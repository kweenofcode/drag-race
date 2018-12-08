const express = require('express')
const Router = express.Router
const router = Router()
const Rule = require('../models/Rule')

router.get('/', async(req, res, next) => {
    try {
      const docs = await Rule.find()
      res.status(200).send({
        data: docs
      })
    } catch(e) {
      next(e)
    }  
  })

router.post('/', async(req, res, next) => {
  const {body, description, points } = req.body
  try {
    const doc = new Rule({ body, description, points })
    await doc.save()
    res.status(201).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

router.delete('/:rule_id', async(req, res, next) => {
  try {
    const { rule_id }=  req.params
    const doc = await Rule.findByIdAndRemove(rule_id)
    res.status(204).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})


module.exports = router