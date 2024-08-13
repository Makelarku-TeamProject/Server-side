const jwt = require('jsonwebtoken')
const authMiddleware = require('../../../middlewares/authentication/authMiddleware')
jest.mock('jsonwebtoken')

const mockRequest = (body = {}, params = {}, query ={}, headers ={}) => {
    return {
        body: body,
        params: params,
        query,
        headers: headers, 
    }
}

const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);

    return res;
}

describe('authMiddleware authenticaToken function', () => {
    describe('token is valid', () => {
        beforeEach(() => {
            jwt.verify.mockImplementation(() => 'token');
        });

        test('call next handler', async () => {
            const req = mockRequest({}, {}, {}, {
                authorization: 'Bearer token'
            });

            const res = mockResponse();
            const next = jest.fn();

            await authMiddleware.authenticaToken(req, res, next);

            expect(next).toBeCalled();
        })
    })
})