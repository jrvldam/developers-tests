'use strict'

const mongoose      = require('mongoose')
const Promise       = require('bluebird')
mongoose.Promise    = Promise

function bootstrap(mongoOptions) {
  let mongoUri  = mongoOptions.uri
  let mongoOpts = mongoOptions.options || {}

  mongoose.connect(
    mongoUri,
    Object.assign({}, mongoOpts, {
      useNewUrlParser: true,
      useCreateIndex: true,
    })
  )
}

function shutdown() {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connection.close(resolve)
    } catch (err) {
      reject(err)
    }
  })
}

exports.bootstrap = bootstrap
exports.shutdown  = shutdown
