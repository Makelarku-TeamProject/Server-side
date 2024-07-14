/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('house_images', (table) => {
    table.increments('id').primary()
    table.integer('houseId').unsigned().notNullable().references('id').inTable('houses').onUpdate('CASCADE').onDelete('CASCADE')
    table.string('cloudinary_id')
    table.string('image_url').notNullable()
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('house_images')
};
