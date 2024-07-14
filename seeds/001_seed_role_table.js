/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const {v4 : uuidv4 } = require('uuid')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: uuidv4 (), name: 'admin'},
    {id: uuidv4 (), name: 'member'},
    {id: uuidv4 (), name: 'customer'},
  ]);
};
