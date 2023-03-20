import config from './src/config/config';

export const ormConfig =
    {
        type: config.typeorm.connection,
        host: config.typeorm.host,
        port: config.typeorm.port,
        username: config.typeorm.username,
        password: config.typeorm.password,
        database: config.typeorm.database,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: config.typeorm.synchronize,
    }
