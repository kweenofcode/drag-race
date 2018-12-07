const express = require('express')
const Router = express.Router
const router = Router()
const Rule = require('../models/Rule')

router.route('/')
  .get(async(req, res, next) => {
    try {
      const docs = await Rule.find()
      res.status(200).send({
        data: docs
      })
    } catch(e) {
      next(e)
    }  
  })

module.exports = router