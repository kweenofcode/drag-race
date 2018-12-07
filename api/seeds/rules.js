const Rule = require('../models/Rule')

const rules = []

const target = new Rule({
  body: "Target on her back",
  description: "Your queen wins the very first challenge",
  points: 5,
})

rules.push(target)

const pickedLast = new Rule({
  body: "Picked last in gym class",
  description: "Your queen is picked last for a challenge",
  points: -1,
})

rules.push(pickedLast)

module.exports = rules