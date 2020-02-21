const mockError = require('../../__mocks__/mockError');
const mockRequest = require('../../__mocks__/mockRequest');
const mockResponse = require('../../__mocks__/mockResponse');
const handleServerErrors = require('./handleServerErrors');

describe('Server errors handler', () => {
  const requestFromDevelopment = mockRequest('development');
  const requestFromProduction = mockRequest('production');

  let response;

  beforeEach(() => {
    response = mockResponse();
  });

  it('should not set error or message when missing locals', () => {
    const error = mockError('Error message', 500);
    response = { status: jest.fn() }

    handleServerErrors(error, requestFromProduction, response)

    expect(response).not.toHaveProperty('locals')
  })

  it('should not set any response status when response.status is undefined', () => {
    const error = mockError('Error message', 500);
    response = { locals: {} }

    handleServerErrors(error, requestFromProduction, response)

    expect(response).not.toHaveProperty('status')
  })

  it('should not return error data in production environment', () => {
    const error = mockError('Error message that should not be exposed', 418);

    handleServerErrors(error, requestFromProduction, response);

    expect(response.locals.error).toEqual({});
  });

  it('should return error data in development environment', () => {
    const error = mockError('Error message that could be exposed', 418);

    handleServerErrors(error, requestFromDevelopment, response);

    expect(response.locals.error).toEqual(error);
    expect(response.locals.error.message).toEqual(error.message);
    expect(response.locals.message).toEqual(error.message);
  });

  it('should set response status to 500 when not defined by error', () => {
    const error = mockError('Error message without status', null);
    const responseStatusSpy = jest.spyOn(response, 'status');

    handleServerErrors(error, requestFromProduction, response);

    expect(responseStatusSpy).toHaveBeenCalledTimes(1);
    expect(responseStatusSpy).toHaveBeenCalledWith(500);
  });

  it('should set response status to 418 when 418 was defined by error', () => {
    const error = mockError('Error message with status', 418);
    const responseStatusSpy = jest.spyOn(response, 'status');

    handleServerErrors(error, requestFromProduction, response);

    expect(responseStatusSpy).toHaveBeenCalledTimes(1);
    expect(responseStatusSpy).toHaveBeenCalledWith(418);
  });

});
