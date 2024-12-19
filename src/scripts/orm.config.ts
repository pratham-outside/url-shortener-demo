import { writeFile } from 'fs/promises';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
config();

const dataBaseConfigurations = {
  type: 'postgres',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false, // Should be false in production to use migrations
  logging: true,
  entities: [join(__dirname, '/../*/entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '/../migrations', '*.{ts,js}')],
};

const dataSource = new DataSource(dataBaseConfigurations as DataSourceOptions);

writeFile('ormconfig.json', JSON.stringify(dataSource.options, null, 2));
export { dataSource, dataBaseConfigurations };
