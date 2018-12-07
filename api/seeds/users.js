const User = require('../models/User')

const users = []

const ky = new User({
  name: "Ky Capstick",
})

users.push(ky)

const alex = new User({
  name: "Alex Janssen",
})

users.push(alex)

module.exports = users