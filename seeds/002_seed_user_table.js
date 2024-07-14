/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');
const { v4 : uuidv4 } = require('uuid')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const roles = await knex('roles').select('id', 'name')
  const adminRole = roles.find(role => role.name === 'admin').id
  const memberRole = roles.find(role => role.name === 'member').id
  const customeRole = roles.find(role => role.name === 'customer').id
  await knex('users').insert([
    {id: uuidv4 (), username: 'admin', email: 'admin@mail.com', password: await bcrypt.hash('password', 10), roleId: adminRole},
    {id: uuidv4 (), username: 'member', email: 'member@mail.com', password: await bcrypt.hash('password', 10), roleId: memberRole},
    {id: uuidv4 (), username: 'customer', email: 'customer@mail.com', password: await bcrypt.hash('password', 10), roleId: customeRole},
  ]);
};
