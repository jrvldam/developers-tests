'use strict'

const Commerce = require('../models/commerce')

function validateParams(req, res, next) {
  if (!req.query.lat && !req.query.lng) {
    return res.status(400).json({ error: 'Invalid search params' })
  }

  next()
}

module.exports = (router) => {
  router.get('/', validateParams, findSearch)
}

async function findSearch(req, res) {
  const { lng, lat } = req.query

  Commerce.find({ location: [lng, lat] })
    .then(result => {
      result.length
        ? res.json(result)
        : res.status(204).send()
    })
    .catch(() => {
      res.status(500).send()
    })
}
