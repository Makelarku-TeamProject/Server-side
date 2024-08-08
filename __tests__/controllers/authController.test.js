const authController = require('../../controllers/authController');
const userModel = require('../../models/user');
const Helpers = require('../../helpers/helpers');
const bcrypt = require('bcrypt')
jest.mock('../../models/user');
jest.mock('../../helpers/helpers');
jest.mock('bcrypt')

const mockRequest = (body = {}, params = {}, query ={}) => {
    return {
        body: body,
        params: params,
        query,
        session: {},
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

describe('authController login function', () => {
    beforeEach(() => {
        userModel.getUserRoleByemail.mockImplementation(() => ({}));
        bcrypt.compare.mockImplementation(() => true);
        Helpers.responBody.mockImplementation(() => ({
            status: 'success',
        }));
    });

    test('login succesfully', async () => {
        const req = mockRequest({
            email: 'ahmad234@gmail.com',
            password: '1234',
        });
        const res = mockResponse();

        await authController.login(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: 'success',
        });
    });
})
