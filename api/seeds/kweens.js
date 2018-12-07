const Kween = require('../models/Kween');

const kweens = []

const valentina = new Kween({
  name: 'Valentina',
})

kweens.push(valentina)

const gia = new Kween({
  name: 'Gia Gunn',
})

kweens.push(gia)

const monet = new Kween({
  name: "Monét X Change",
})

kweens.push(monet)

const latrice = new Kween({
  name: "Latrice Royale",
})

kweens.push(latrice)

const trinity = new Kween({
  name: "Trinity Taylor"
})

kweens.push(trinity)

module.exports = kweens