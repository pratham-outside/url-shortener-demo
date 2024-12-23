import { Module } from '@nestjs/common';
// import { ConfigModule as EnvConfig } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';
import { dataBaseConfigurations } from 'src/scripts/orm.config';
import { DataSource, TypeORMError } from 'typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => {
				return {
					host: process.env.HOST,
					// type: 'postgres',
					// port: +process.env.POSTGRES_PORT,
					// username: process.env.POSTGRES_USER,
					// password: process.env.POSTGRES_PASSWORD,
					// database: process.env.POSTGRES_DB,
					// entities: [join('**', 'entities', '*.entity.{ts,js}')],
					// migrations: [join('**', 'migrations', '*.{ts,js}')],
					// synchronize: false,
					...dataBaseConfigurations,
				} as TypeOrmModuleOptions;
			},
			dataSourceFactory: async (options) => {
				try {
					console.log('----- Connecting to DataBase ------');
					const dataSource = await new DataSource(options).initialize();
					console.log(' ------ Connected to Database successfully -----');
					return dataSource;
				} catch (error) {
					throw new TypeORMError(`Error Connection to database , "${error}"`);
				}
			},
		}),
	],
})
export class DatabaseModule {}
