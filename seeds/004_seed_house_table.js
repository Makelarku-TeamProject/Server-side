/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('houses').del()
  
  const categories = await knex('categories').select('id', 'name')
  const jualCategory = categories.find(category => category.name === 'Jual').id

  const users = await knex('users').select('id','username')
  const adminId = users.find(users => users.username === 'admin').id

  await knex('houses').insert([
    {name: 'Rumah bagus', num_rooms: 4, sq_ft: 250, location: 'Tangerang', price: 10_000, description: 'ya udah sayang deh!!!',  categoryId: jualCategory, userId:adminId },
  ]);
};
