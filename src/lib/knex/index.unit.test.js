const knex = require('.')
const { knexConfig } = require('.')

describe('Knex database connection instance', function () {

  const OLD_ENV = process.env;

  beforeEach(function () {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    delete process.env.DATABASE_URL
  })

  afterEach(function () {
    process.env = OLD_ENV
  })

  it('should have Postgres as client', function() {
    expect(knexConfig.client).toEqual('pg')
  })

  describe('connection property', function () {
    it('should return DATABASE_URL environment variable', function () {
      process.env.DATABASE_URL = 'postgres://username:password@host/database'
      expect(knexConfig.connection()).toEqual('postgres://username:password@host/database')
    })
  })

  it('should have insert and select functions', function () {
    expect(typeof knex.insert).toEqual('function')
    expect(typeof knex.select).toEqual('function')
  })

})
