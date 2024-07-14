/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('email').notNullable().unique()
    table.uuid('roleId').references('id').inTable('roles').onUpdate('CASCADE').onDelete('CASCADE')
    table.timestamps(true, true)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
