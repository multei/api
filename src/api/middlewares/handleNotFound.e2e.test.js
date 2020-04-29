// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../app');

describe('API', () => {
  it('should return 404 after GET /nonexistent endpoint', async () => {
    const res = await request(app).get('/nonexistent');

    expect(res.statusCode).toEqual(404);
  });
});
