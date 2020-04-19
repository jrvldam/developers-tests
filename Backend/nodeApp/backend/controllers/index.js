'use strict'

const Commerce = require('../models/commerce')

function validateParams(req, res, next) {
  if (!req.query.lat || !req.query.lng || !req.query.category) {
    return res.status(400).json({ error: 'Invalid search params' })
  }

  next()
}

module.exports = (router) => {
  router.get('/', validateParams, findSearch)
}

function findSearch(req, res) {
  const { lng, lat, category } = req.query

  Commerce.findByLocation({ lng, lat, category })
    .then(result => {
      result.length
        ? res.json(result)
        : res.status(204).send()
    })
    .catch(() => {
      res.status(500).send()
    })
}
