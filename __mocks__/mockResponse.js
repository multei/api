const mockResponse = (error, message) => ({
  locals: {
    error: error,
    message: message,
  },
  status: jest.fn(),
});

module.exports = mockResponse;
