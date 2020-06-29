// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../../../app')

describe('/v1/parkings', function () {
  it('should return not allowed', async () => {
		const data = {
			uuid: '1a27f95a-97dd-461f-8dbd-7d03165adb8b',
			coordinates: '-19.9209351,-43.921136',
		}
    await request(app).patch('/v1/parkings').send(data).expect(405)
	})

  it('should return internal error', async () => {
		const data = {
			uuid: 'th1s-1s-an-inv4l1d-uu1d',
			coordinates: '-19.9209351,-43.921136',
		}
	
    await request(app).patch('/v1/parkings').send(data).expect(500)
	})

	afterAll(async done => {
		done();
	});
})
