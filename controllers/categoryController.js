const categoryModel = require("../models/categories")
const helpers = require('../helpers/helpers.js')

class categoryController {
    static getAllCategories = async (req, res, next) => {
        try {
            const categories = await categoryModel.getAllCategories()
            return res.status(200).json(helpers.responBody('Success', categories))
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    static getCategoryById = async (req, res, next) => {
        const { id } = req.params
        try {
            const category = await categoryModel.getCategoryById(id)
            if(category){
                return res.status(200).json(helpers.responBody('Success', category))
            }else{
                const error = new Error('Category not found');
                error.code = 404;
                next(error);
            }
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    static createCategory = async (req, res, next) => {
        const { name } = req.body
        try {
            const newCategory = await categoryModel.createCategory({ name })
            return res.status(201).json(helpers.responBody('Success', newCategory))
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    static updateCategory = async (req, res, next) => {
        const { name } = req.body
        const { id } = req.params
        try {
            const updateCategory = await categoryModel.updateCategory(id ,{name})
            if(updateCategory){
                return res.status(200).json(helpers.responBody('Success', updateCategory))
            }else {
                const error = new Error('Category not found')
                error.code = 404
                next(error)
            }
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }

    static deleteCategory = async (req, res, next) => {
        const { id } = req.params
        try {
            const deleteCategory = await categoryModel.deleteCategory(id)
            if(deleteCategory){
                return res.status(200).json(helpers.responBody('Success', deleteCategory))
            }else{
                const error = new Error('Category not found')
                error.code = 404
                next(error)
            }
        } catch (error) {
            next({ code: 500, message: error.message });
        }
    }
}

module.exports = categoryController