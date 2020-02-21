const knexFile = require('./knexfile')

describe("Database client", function () {
  it("should be Postgres on development environment", function () {
    expect(knexFile.development.client).toEqual('pg')
  })

  it("should be Postgres on production environment", function () {
    expect(knexFile.production.client).toEqual('pg')
  })
})
