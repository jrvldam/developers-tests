'use strict'

const Joi = require('@hapi/joi')
const Commerce = require('../models/commerce')

function validateQureyString(req, res, next) {
  const schema = Joi
    .object({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      category: Joi.string().valid('CAFE', 'PUB').required(),
    })
  const { error } = schema.validate(req.query)

  if (error) {
    return res.status(400).json({ error: 'Invalid search params' })
  }

  next()
}

const VALID_ID_LENGTH = 24
function validateIdParam(req, res, next) {
  const schema = Joi
    .string()
    .alphanum()
    .length(VALID_ID_LENGTH)
    .required()
  const { error } = schema.validate(req.params.id)

  if (error) {
    return res.status(404).send()
  }

  next()
}

module.exports = (router) => {
  router.get('/:id', validateIdParam, findById)
  router.get('/', validateQureyString, findSearch)
}

function findById(req, res) {
  const { id } = req.params

  Commerce.findOne({ _id: id })
    .then(result => {
      result
        ? res.json(result)
        : res.status(404).send()
    })
    .catch(() => {
      res.status(500).send()
    })
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
