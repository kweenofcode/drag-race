const mongoose = require('mongoose')

const Kween = require('../models/Kween')
const Rule = require('../models/Rule')
const User = require('../models/User')
const kweens = require('./kweens')
const rules = require('./rules')
const users = require('./users')
const uri = 'mongodb://localhost:27017/drag-race'

const truncateDatabase = async () => {
  return Promise.all([Kween.deleteMany(), Rule.deleteMany()])
}

const makeSeeds = async () => {
  await mongoose.connect(uri)

  await truncateDatabase()

  await Promise.all(kweens.map(async(kween) => await kween.save())),
  await Promise.all(rules.map(async(rule) => await rule.save()))
  await Promise.all(users.map(async(user) => await user.save()))

  mongoose.connection.close()
}

makeSeeds()