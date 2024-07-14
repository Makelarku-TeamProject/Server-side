const knex = require("../config/config")

class categoryModel {
  // TODO: get all categories
  static getAllCategories = async () => {
    try {
      return await knex('categories').select('*')
    } catch (error) {
      throw new Error(error.message)
    }
  }

   // TODO: get all categories by id
  static getCategoryById = async(id) => {
    try {
      return await knex('categories').where({ id }).first()
    } catch (error) {
      throw new Error(error.message)
    }
  }

   // TODO: create category
  static createCategory= async(categorydata) => {
    try {
      return await knex('categories').insert(categorydata).returning('*')
    } catch (error) {
      throw new error(error.message)
    }
  }

   // TODO: update category by id
  static updateCategory = async(id, categorydata) =>{
    try {
      return await knex('categories').where({ id }).update(categorydata).returning('*')
    } catch (error) {
      throw new error(error.message)
    }
  }


  // TODO: delete category
  static deleteCategory= async(id) => {
    try {
      return await knex('categories').where({ id }).del()
    } catch (error) {
      throw new error(error.message)
    }
  }
}

module.exports = categoryModel;
