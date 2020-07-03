// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../../../app')

jest.mock('./db')

describe('/v1/parkings', function () {
  it('should return not allowed', async () => {
		const data = {
			uuid: 'completed_uuid',
			coordinates: '-19.9209351,-43.921136',
		}
    await request(app).patch('/v1/parkings').send(data).expect(405)
	})

  it('should return internal error', async () => {
		const data = {
			coordinates: '-19.9209351,-43.921136',
		}
	
    await request(app).patch('/v1/parkings').send(data).expect(500)
	})

  it('should return success', async () => {
		const data = {
			uuid: 'incomplete_uuid',
			coordinates: '-19.9209351,-43.921136',
		}
	
    await request(app).patch('/v1/parkings').send(data).expect(200)
	})

	afterAll(async done => {
		done();
	});
})
