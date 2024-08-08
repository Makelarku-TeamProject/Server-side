const houseController = require('../../controllers/houseController');
const houseModel = require('../../models/houses');
const houseImageModel = require('../../models/house_images');
const helpers = require('../../helpers/helpers');
jest.mock('../../models/houses');
jest.mock('../../models/house_images')
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

describe('houseController getAllHouse function', () => {
    beforeEach(() => {
        houseModel.getAllHouses.mockImplementation(()=> [{}]);
        helpers.responBody.mockImplementation(() => ({
            status: 'success',
            data: [{}]
        }));
    });

    test('return all house', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await houseController.getAllHouse(req, res); 

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: 'success',
            data: [{}]
        });
    });
})