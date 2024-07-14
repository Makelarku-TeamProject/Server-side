const cloudinary = require('../config/cloudinary');
const sliderModel = require("../models/slider")
const helpers = require('../helpers/helpers')


// TODO : slider Controller
class sliderController {
    // TODO : get slider
    static getAllSlider = async (req, res, next) => {
        try {
            const sliders = await sliderModel.getAllSliders()
            return res.status(200).json(helpers.responBody('Success', sliders))
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : get slider by id
    static getSliderById = async (req, res, next) => {
        const { id } = req.params
        try {
            const sliders = await sliderModel.getSliderById(id)
            if(sliders){
                return res.status(200).json(helpers.responBody('Success', sliders))
            }else{
                const error = new Error('slider not found');
                error.code = 404;
                next(error);
            }
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : create slider
    static createSlider = async (req, res, next) => {
        const { name } = req.body
        const image = req.file
        try {
            // * validasi image
            if (!image) {
                return res.status(400).json(helpers.responBody('Image file required'))
            }
            // * save image ke db local dan cloudinary
            const result = await cloudinary.uploader.upload(image.path, {
                folder: 'slider'
            });
            const slider = await sliderModel.createSlider({ name, image_url: result.secure_url, cloudinary_id: result.public_id });

            return res.status(200).json(helpers.responBody('Slider created successfully', slider))
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

     // TODO : get update by id
     static updateSlider = async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;
        const newImage = req.file;
    
        try {
          // * validasi image
          if (!newImage) {
            return res.status(400).json(helpers.responBody('Image file required'));
          }
    
          // * check slider by id
          const slider = await sliderModel.getSliderById(id);
          if (!slider) {
            return res.status(400).json(helpers.responBody('Slider not found'));
          }
    
          // * Log check old image's cloudinary_id
          console.log("Old image cloudinary_id:", slider.cloudinary_id);
           // * Delete old image from Cloudinary
           if (slider.cloudinary_id) {
            const deleteResult = await cloudinary.uploader.destroy(slider.cloudinary_id);
            // * Log the deletion result
            console.log("Delete old image result:", deleteResult);
          }
    
          // * save image ke db local dan cloudinary
          const result = await cloudinary.uploader.upload(newImage.path, {
            folder: 'slider'
          });
    
          // * Log the new image upload result
          console.log("New image upload result:", result);
    
    
          //*  Update slider => db local
          const updateSliders = await sliderModel.updateSlider(id, { name, image_url: result.secure_url, cloudinary_id: result.public_id });
    
          if (updateSliders) {
            return res.status(200).json(helpers.responBody('Slider updated successfully', updateSliders));
          } else {
            const error = new Error('Slider not found');
            error.code = 404;
            next(error);
        }
    } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : delete Slider
    static deleteSlider = async (req, res, next) => {
        const { id } = req.params
        try {
            // * check slider by id
            const slider = await sliderModel.getSliderById(id);
            if (!slider) {
                return res.status(404).json(helpers.responBody('Slider not found'));
            }
            
            // * check slider cloudinary id old image
            if (slider.cloudinary_id) {
                const deleteResult = await cloudinary.uploader.destroy(slider.cloudinary_id);
                // * Log the deletion result
                console.log("Delete old image result:", deleteResult);
            }
 
            const deleteSlider =  await sliderModel.deleteSlider(id);
            if(deleteSlider){
                return res.status(200).json(helpers.responBody('Slider deleted successfully', deleteSlider))
            }else{
                const error = new Error('Slider not found')
                error.code = 404
                next(error)
            }
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }
}

module.exports = sliderController