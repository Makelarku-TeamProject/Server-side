/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('houses', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('num_rooms').notNullable()
    table.integer('sq_ft').notNullable()
    table.string('location').notNullable()
    table.integer('price').notNullable()
    table.text('description').notNullable()
    table.integer('categoryId').unsigned().notNullable().references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE')
    table.uuid('userId').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    table.timestamps(true, true)
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('houses')
};
