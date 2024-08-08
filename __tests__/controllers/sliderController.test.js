const sliderController = require('../../controllers/sliderController');
const cloudinary = require('../../config/cloudinary');
const sliderModel = require("../../models/slider")
const helpers = require('../../helpers/helpers')
jest.mock('../../models/slider');
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

describe('sliderController getAllSlider function', () => {
    beforeEach(() => {
        sliderModel.getAllSliders.mockImplementation(()=> [{}]);
        helpers.responBody.mockImplementation(() => ({
            status: 'success',
            data: [{}]
        }));
    });

    test('return all slider', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await sliderController.getAllSlider(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: 'success',
            data: [{}]
        });
    });
})