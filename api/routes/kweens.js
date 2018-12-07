'use strict';

const express = require('express');
const Router = express.Router;
const router = Router()

const Kween = require('../models/Kween')

router.get('/', async (req, res, next) => {
    const docs = await Kween.find().populate('points')
    res.status(200).send({
      data: docs,
    })
  });

router.post('/', async(req, res, next) => {
  const { name } = req.body
  try {
    const doc = new Kween({ name })
    await doc.save()
    res.status(201).send({ data: [doc] })
  } catch(e) {
    next(e)
  }
})

module.exports = router;
