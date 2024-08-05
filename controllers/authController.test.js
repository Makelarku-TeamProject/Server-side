const authController = require('./authController');
const userModel = require('../models/user');
const Helpers = require('../helpers/helpers');
jest.mock('../models/user');
jest.mock('../helpers/helpers');

const mockRequest = (body = {}, params = {}, query ={}) => {
    return {
        body: body,
        params: params,
        query,
    }
}

const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);

    return res;
}

beforeEach(() =>{
    userModel.getRoleByName.mockImplementation(() => ({
        id: 'id'
    }))
})
describe('authController register function', () => {
    describe('email does not exist', () => {
        beforeEach(() => {
            userModel.getUserByEmail.mockImplementation(() => null);
            userModel.createUser.mockImplementation(() => ({}));
            Helpers.responBody.mockImplementation(() => ({
                status: 'success',
            }));
        })

        test('register succesfully', async () => {
            const req = mockRequest({
                username: 'Ahmad',
                email: 'ahmad234@gmail.com',
                password: '1234',
                role: 'customer',
            });
            const res = mockResponse();

            await authController.register(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: 'success',
            })
        })
    })
})