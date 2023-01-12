import errorHandler from './error-handler';

describe('errorHandler', () => {
  it("logs an error and responds with the error's status code and message", () => {
    const req = {
      headers: {},
      log: {
        error: jest.fn(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const error = new Error('Something went wrong');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Something went wrong');

    expect(req.log.error).toHaveBeenCalledWith(error);
  });
});
