const { isCompleted } = require('./complaint.domain')


describe('/v1/parkings/validator', function () {
    it('should return true when completed_at not empty', async () => {
      const complaint = {
         completed_at: '2020-08-21 16:36:06.783132-03'
      }
    expect(isCompleted(complaint)).toBe(true)
    })
  
    it('should return false when completed_at empty', async () => {
      const complaint = {
         completed_at: undefined
      }
    expect(isCompleted(complaint)).toBe(false)
    })
  })