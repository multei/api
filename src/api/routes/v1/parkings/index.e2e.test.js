// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../../../app')

jest.mock('../../../services/db')

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

  	 it('should return completed parking when searching for a plate', async () => {
		const car_plate = 'FUM2296'
		const result = await request(app).get(`/v1/parkings/${car_plate}`)
		const parking = result.body.data.parkings[0]
		
		expect(result.status).toBe(200)
		expect(parking.car_plate).toBe(car_plate)
		expect(parking.uuid).toBeDefined()
		expect(parking.completed_at).toBeDefined()
		
	 })

	afterAll(async done => {
		done();
	});
})
