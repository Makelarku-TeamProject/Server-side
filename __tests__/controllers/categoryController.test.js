const categoryController = require('../../controllers/categoryController');
const categoryModel = require("../../models/categories")
const helpers = require('../../helpers/helpers.js')
jest.mock('../../models/categories');
jest.mock('../../helpers/helpers');

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

describe('categoriesController getAllCategories function', () => {
    beforeEach(() => {
        categoryModel.getAllCategories.mockImplementation(()=> [{}]);
        helpers.responBody.mockImplementation(() => ({
            status: 'success',
            data: [{}]
        }));
    });

    test('return all categories', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await categoryController.getAllCategories(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: 'success',
            data: [{}]
        });
    });
})


describe('categoriesController createCategory function', () => {
    beforeEach(() => {
        categoryModel.createCategory.mockImplementation(()=> [{}]);
        helpers.responBody.mockImplementation(() => ({
            status: 'success',
            data: [{}]
        }));
    });

    test('return all categories', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await categoryController.createCategory(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: 'success',
            data: [{}]
        });
    });
})