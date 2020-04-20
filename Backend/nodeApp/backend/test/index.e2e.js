'use strict'

const _        = require('lodash')
const request  = require('supertest')
const server   = require('./helpers/server')
const Commerce = require('../models/commerce')

describe('Commerce e2e', () => {

  let app

  before((done) => {
    app = server.startup(done)
  })

  after((done) => {
    server.shutdown(app, done)
  })

  afterEach(() => {
    return Promise.all([
      Commerce.deleteMany()
    ])
  })

  describe('GET /?', () => {
    it('should get error with empty query params', () => {
      return request(app)
        .get('/')
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.error).to.equal('Invalid search params')
        })
    })
  })

  describe('GET /?lat&lng', () => {
    context('when existing commerces in given location', () => {
      beforeEach(() => {
        return Promise.all([
          createCommerce({name: 'Bar Tolo', location: [-3.0000, 40.0000], category: 'PUB'}),
          createCommerce({name: 'Bar Eto',  location: [-3.0000, 40.0000], category: 'PUB'}),
          createCommerce({name: 'Bar Ucho', location: [30.0000, 40.0000], category: 'PUB'}),
        ])
      })

      it('should get the commerces', () => {
        let latlng = {
          lat: 40.000,
          lng: -3.000,
          category: 'PUB',
        }

        return request(app)
          .get('/')
          .query(latlng)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body).to.have.lengthOf(2)

            let names = _.map(res.body, 'name')
            expect(names).to.have.members(['Bar Tolo', 'Bar Eto'])
          })
      })
    })

    context('when non existing commerces in given location', () => {
      beforeEach(() => {
        return Promise.all([
          createCommerce({name: 'Bar Tolo', location: [-3.0000, 40.0000], category: 'PUB'}),
          createCommerce({name: 'Bar Eto',  location: [-3.0000, 40.0000], category: 'PUB'}),
          createCommerce({name: 'Bar Ucho', location: [30.0000, 40.0000], category: 'PUB'}),
        ])
      })

      it('should get empty response', () => {
        let latlng = {
          lat: 77.7777,
          lng: 77.7777,
          category: 'PUB',
        }

        return request(app)
          .get('/')
          .query(latlng)
          .expect(204)
      })
    })
  })

  describe('GET /:id', () => {
    context('when providing id commerce', () => {
      let items
      beforeEach(() => {
        return Promise.all([
          createCommerce({name: 'Bar Tolo', location: [-3.0000, 40.0000], category: 'PUB'}),
          createCommerce({name: 'Bar Eto',  location: [-3.0000, 40.0000], category: 'PUB'}),
          createCommerce({name: 'Bar Ucho', location: [30.0000, 40.0000], category: 'PUB'}),
        ])
          .then(res => {
            items = res
          })
      })
      it('should get a commerce', () => {
        const commerce = items[0]

        return request(app)
          .get(`/${commerce._id.toString()}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body._id).to.be.equal(commerce._id.toString())
          })
      })

      it('should return not found if id does not match', () => {
        return request(app)
          .get('/5e9ce6ef8fc481ea4dee048c')
          .expect(404)
      })
    })

    it('should return not found if wrong id format', () => {
      return request(app)
        .get('/5e9ce6ef8fc481e')
        .expect(404)
    })
  })

  function createCommerce(newCommerce) {
    return Commerce.create(_.defaults(newCommerce, {
      name: 'Bar Tolo',
      description: 'Lounge bar ibicenco con coctails fashionables',
      location: [-3.0000, 40.0000],
      category: 'PUB',
    }))
  }
})
