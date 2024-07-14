const knex = require('../config/config')

class houseModel {
    // TODO : get all house dengan join house dan house_images
    static getAllHouses = async () => {
        try {
            return await knex('houses') 
            .select('houses.*', knex.raw('JSON_AGG(house_images.id) as houseImagesId'), knex.raw('JSON_AGG(house_images.image_url) as images'))
            .leftJoin('house_images', 'houses.id','=', 'house_images.houseId')
            .groupBy('houses.id')
            .orderBy('houses.id')
        } catch (error) {
            throw new Error(error.message)            
        }
    } 
    // TODO : get all house dengan join house dan house_images
    static getAllHousewithjoin = async (id) => {
        try {
            return await knex('houses') 
           // .select('houses.*', knex.raw('COALESCE(JSON_AGG(house_images.image_url) FILTER (WHERE house_images.image_url IS NOT NULL), \'[]\') AS images'))
                .select('houses.*', knex.raw('JSON_AGG(house_images.image_url) as images'))
                .leftJoin('house_images', 'houses.id', '=', 'house_images.houseId')
                .groupBy('houses.id')
                .where('houses.id', id)
                .first();
        } catch (error) {
            console.error('Error fetching house with images:', error);
            throw new Error(error.message);
        }
    }
    
    // TODO : get house by id dengan join house dan house_images
    static getHouseById = async (id) => {
        try {
            return await knex('houses').where({ id }).first()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // TODO : create house
    static createHouse = async (housedata) => {
        try {
            return await knex('houses').insert(housedata).returning('*')
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    // TODO : update house by id
    static updateHouse = async (id, housedata) => {
        try {
            return await knex('houses').where({ id }).update(housedata).returning('*')
        } catch (error) {
            throw new Error(error.message)         
        }
    }

      // TODO : delete house by id
      static deleteHouse = async (id) => {
        try {
            return await knex('houses').where({ id }).del()
        } catch (error) {
            throw new Error(error.message)         
        }
    }

    
}

module.exports = houseModel