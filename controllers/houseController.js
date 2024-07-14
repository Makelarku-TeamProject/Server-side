const cloudinary = require('../config/cloudinary');
const houseModel = require('../models/houses');
const houseImageModel = require('../models/house_images');
const helpers = require('../helpers/helpers');


// TODO : house Controller
class houseController {
    // TODO : Get all houses
    static getAllHouse = async (req, res, next) => {
        try {
            const getAllHouse = await houseModel.getAllHouses();
            return res.status(200).json(helpers.responBody('Success', getAllHouse));
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : Get house by id with join on house_images
    static getHousewithJoin = async (req, res, next) => {
        const { id } = req.params;
        try {
            const getHousewithjoin = await houseModel.getAllHousewithjoin(id);
            return res.status(200).json(helpers.responBody('Success', getHousewithjoin));
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : Get house by id
    static getHouseById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const getHouseById = await houseModel.getHouseById(id);
            return res.status(200).json(helpers.responBody('Success', getHouseById));
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : Create house
    static async createHouse(req, res, next) {
        const { name, num_rooms, sq_ft, location, price, description, categoryId } = req.body;
        const images = req.files && req.files.length > 0
        
        try {
            const [house] = await houseModel.createHouse({ 
                name, num_rooms, sq_ft, location, price, description, categoryId, userId: req.user.id 
            });

            let imageUrls = []

            if(images){
                imageUrls = await Promise.all(req.files.map(async file => {
                    try {
                        const result = await cloudinary.uploader.upload(file.path, { folder: 'houses' })
                        const uploadedImage = await houseImageModel.createHouseImage({
                            houseId : house.id,
                            image_url: result.secure_url,
                            cloudinary_id: result.public_id
                        })
                        return uploadedImage
                    } catch (error) {
                        next({ code: 500, message: `Error uploading image: ${file.originalname}` });
                    }
                }))
            }
            res.status(201).json(helpers.responBody('House created successfully', {house, imageUrls}));
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    // TODO : Update house by id
    static async updateHouse(req, res, next) {
        const { id } = req.params;
        const { name, num_rooms, sq_ft, location, price, description, categoryId } = req.body;
        const imagesToDelete = req.body.imagesToDelete ? JSON.parse(req.body.imagesToDelete) : [];
        const newImages = req.files && req.files.length > 0;
    
        try {
               // * Delete specified images
               if (imagesToDelete && imagesToDelete.length > 0) {
                await Promise.all(imagesToDelete.map(async imageId => {
                    const image = await houseImageModel.getHouseImageById(imageId);
                    if (image) {
                        try {
                            const result = await cloudinary.uploader.destroy(image.cloudinary_id);
                            if (result.result !== 'ok') {
                                console.error(`Failed to delete image from Cloudinary: ${image.cloudinary_id}`);
                                throw new Error(`Failed to delete image from Cloudinary: ${image.cloudinary_id}`);
                            }
                            // * Delete image record from database
                            await houseImageModel.deleteHouseImage(imageId);
                        } catch (err) {
                            console.error(`Error deleting image: ${err.message}`);
                            next({ code: 500, message: `Error deleting image: ${image.cloudinary_id}` });
                        }
                    } else {
                        console.error(`Image not found: ${imageId}`);
                    }
                }));
            }
           
            // * Update house 
            const house = await houseModel.updateHouse(id, { 
                name, num_rooms, sq_ft, location, price, description, categoryId 
            });
         
            // * Upload new images and add records
            let newImageUrls = [];
            if (newImages) {
                newImageUrls = await Promise.all(req.files.map(async file => {
                    const result = await cloudinary.uploader.upload(file.path, { folder: 'houses' });
                    const newImage = await houseImageModel.createHouseImage({
                        houseId: id,
                        image_url: result.secure_url,
                        cloudinary_id: result.public_id
                    });
                    return newImage;
                }));
            }
    
            res.status(201).json(helpers.responBody('House updated successfully', { house, newImageUrls}));
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }
    
     // TODO : Delete house by id
     static async deleteHouse(req, res, next) {
        const { id } = req.params;
    
        try {
            const house = await houseModel.getHouseById(id);
    
            if (!house) {
                return res.status(404).json({ message: 'House not found' });
            }
    
            const houseImages = await houseImageModel.getHouseImageById(id); 
            console.log("🚀 ~ houseController ~ deleteHouse ~ houseImages:", houseImages.length)
    
            // if (houseImages.length === 0) {
            //     return res.status(404).json({ message: 'No images found for this house' });
            // }
    
            // Delete each image from Cloudinary and its metadata from the database
            const deletePromises = houseImages.map(async (image) => {
                try {
                    const result = await cloudinary.uploader.destroy(image.cloudinary_id);
                    if (result.result !== 'ok') {
                        throw new Error(`Failed to delete image from Cloudinary: ${image.cloudinary_id}`);
                    }
                    await houseImageModel.deleteHouseImage(image.id);
                } catch (error) {
                    console.error(`Error deleting image ${image.cloudinary_id}: ${error.message}`);
                    throw error; 
                }
            });
            await Promise.all(deletePromises);
            await houseModel.deleteHouse(id);
    
            res.status(200).json({ message: 'House and associated images deleted successfully' });
        } catch (error) {
            console.error(`Error deleting house and images: ${error.message}`);
            next({ code: 500, message: error.message });
        }
    }
    
    
}

module.exports = houseController;
