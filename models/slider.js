const knex = require("../config/config")

class sliderModel {
  // TODO: get all sliders
  static getAllSliders = async () => {
    try {
      return await knex('sliders').select('*')
    } catch (error) {
      throw new Error(error.message)
    }
  }

   // TODO: get all slider  by id
  static getSliderById = async(id) => {
    try {
      return await knex('sliders').where({ id }).first()
    } catch (error) {
      throw new Error(error.message)
    }
  }

   // TODO: create slider
  static createSlider= async (sliders) => {
    try {
      return await knex('sliders').insert(sliders).returning('*')
    } catch (error) {
      throw new error(error.message)
    }
  }

   // TODO: update slider by id
  static updateSlider = async(id, sliders) =>{
    try {
      return await knex('sliders').where({ id }).update(sliders).returning('*')
    } catch (error) {
      throw new error(error.message)
    }
  }


  // TODO: delete slider
  static deleteSlider = async(id) => {
    try {
      return await knex('sliders').where({ id }).del()
    } catch (error) {
      throw new error(error.message)
    }
  }
}

module.exports = sliderModel;
