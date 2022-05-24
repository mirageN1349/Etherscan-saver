const dotenv = require('dotenv');
dotenv.config();

const PROD = process.env.NODE_ENV === 'production';
module.exports = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  entities: [PROD ? 'dist/entity/*.js' : 'src/entity/*.ts'],
  subscribers: [PROD ? 'dist/subscriber/*.js' : 'src/subscriber/*.ts'],
  migrations: [PROD ? 'dist/migration/*.js' : 'src/migration/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
