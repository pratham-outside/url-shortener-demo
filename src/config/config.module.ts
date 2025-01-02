import { Module } from '@nestjs/common';
// import { ConfigModule as EnvConfig } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';
import { dataBaseConfigurations } from 'src/config/db.config';
import { DataSource, TypeORMError } from 'typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => {
				return {
					host: process.env.HOST,
					...dataBaseConfigurations,
				} as TypeOrmModuleOptions;
			},
			dataSourceFactory: async (options) => {
				try {
					console.log('----- Connecting to DataBase ------');
					const dataSource = await new DataSource(options).initialize();
					console.log(' ------ Connected to Database successfully -----');
					return dataSource;
				} catch (e) {
					throw new Error(e);
				}
			},
		}),
	],
})
export class DatabaseModule {}
