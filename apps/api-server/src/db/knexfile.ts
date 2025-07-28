import { Knex } from 'knex';
import dotenv from 'dotenv';

// dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: 'postgres://collab_user:collab_pass@localhost:5432/collab_db',
    migrations: {
        directory: './migrations'
    }
  },
};

export default config;
