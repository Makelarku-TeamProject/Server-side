require('dotenv').config();
const knex = require('knex');

const knexConfig = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

const db = knex(knexConfig);

db.raw('SELECT * FROM public.users ORDER BY id ASC ')
  .then(() => {
    console.log('Database connection successful');
    db.destroy();
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    db.destroy();
  });
