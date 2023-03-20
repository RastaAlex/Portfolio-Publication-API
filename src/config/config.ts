import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { validate } from './config.validation';

const envPath = resolve(__dirname, '..', '..', '.env');
console.log(envPath);
dotenv.config({ path: envPath });

if (!existsSync(envPath)) {
  throw new Error('Please create a .env file in the root folder.');
}

export const config = {
  app: {
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
  },
  typeorm: {
    connection: process.env.TYPEORM_CONNECTION as any,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    subscribers: process.env.TYPEORM_SUBSCRIBERS,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};

const validationResult = validate(config);
if (validationResult.error) {
  throw new Error(`Invalid configuration: ${validationResult.error.message}`);
}

export default validationResult.value;
