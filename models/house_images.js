const knex = require('../config/config')

class houseImageModel {
    // TODO: get house_image by id
    static getHouseImageById = async (id) => {
        try {
            return knex('house_images').where({ id })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // TODO: create house image
    static createHouseImage = async (houseImagedata) => {
        try {
            return knex('house_images').insert(houseImagedata).returning('*')
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // TODO: delete house image by id
    static deleteHouseImage = async (id) => {
        try {
            return knex('house_images').where({ id }).del()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = houseImageModel