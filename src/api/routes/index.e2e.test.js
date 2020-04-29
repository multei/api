// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../app')

describe('/ endpoint', function () {
  it('should return empty response on GET', async () => {
    await request(app).get('/').expect(204).expect('')
  })
  it('should return Not Allowed error response on POST', async () => {
    await request(app).post('/').expect(405)
  })
})
