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

router.delete('/:kween_id', async(req, res, next) => {
  const { kween_id } = req.params
  try {
    const doc = await Kween.findByIdAndRemove(kween_id)
    res.status(204).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

router.put('/:kween_id/points', async(req, res, next) => {
  const {kween_id} = req.params
  const { points } = req.body
  try {
    const doc = await Kween.findByIdAndUpdate(kween_id, { points })
    res.status(201).send({
      data: [doc]
    })
  } catch(e) {
    next(e)
  }
})

router.put('/:kween_id/eliminated', async (req, res, next) => {
  const { kween_id } = req.params
  const { eliminated } = req.body
  try {
    const doc = await Kween.findByIdAndUpdate(kween_id, { eliminated })
    res.status(201).send({
      data: [doc]
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router;
