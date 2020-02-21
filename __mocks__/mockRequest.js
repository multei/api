const mockRequest = env => ({
  app: {
    get: jest.fn(() => env),
  },
});

module.exports = mockRequest;
