/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('house_images').del()
  
  const houses = await knex('houses').select('id','name')
  const houseId = houses.find(houses => houses.name === 'Rumah bagus').id

  await knex('house_images').insert([
    {image_url: 'https://res.cloudinary.com/dlnlr5bfg/image/upload/v1719808337/thzafgayta8bttmpcbg4.png', houseId: houseId},
  ]);
};
