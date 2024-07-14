/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sliders', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
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
    return knex.schema.dropTableIfExists('sliders')
};
