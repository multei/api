const request = require('supertest');
const app = require('../../../app');

const headers = [
  ['Referrer-Policy', 'no-referrer'],
  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['X-XSS-Protection', '1; mode=block'],
];

describe('Middleware for adding headers', () => {
  it.each(headers)('adds %s header with value %p', async (field, value) => {
    await request(app)
      .get('/')
      .expect(field, value);
  });
});
