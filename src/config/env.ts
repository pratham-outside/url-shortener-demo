import { config } from 'dotenv';
import { z } from 'zod';
config();
export const env = {
	POSTGRES_DB: process.env.POSTGRES_DB,
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_PORT: +process.env.POSTGRES_PORT,
	DB_HOST: process.env.DB_HOST,
	APP_PORT: +process.env.APP_PORT,
	NODE_ENV: process.env.NODE_ENV,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRATION: process.env.JWT_EXPIRATION,
	SALT_ROUND: +process.env.SALT_ROUND,
} as const;

export enum APP_ENVIRONVENT {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}
const validationSchema = z
	.object({
		POSTGRES_DB: z.string().min(2, { message: 'Must be atleast 2 characters long' }),
		POSTGRES_USER: z.string().min(2, { message: 'Must be atleast 2 characters long' }),
		POSTGRES_PASSWORD: z.string().min(2, { message: 'Must be atleast 2 characters long' }),
		POSTGRES_PORT: z.number().gt(0, { message: 'Port cannot be empty' }),
		DB_HOST: z.string().min(2, { message: 'Must be atleast 2 characters long' }),
		APP_PORT: z.number().gt(0, { message: 'Port cannot be empty' }),
		NODE_ENV: z.nativeEnum(APP_ENVIRONVENT),
		JWT_SECRET: z.string().min(5, { message: 'JWT secret key cannot be smaller than 5' }),
		JWT_EXPIRATION: z.string().min(1, { message: 'JWT_EXPIRATION time cannot be empty' }),
		SALT_ROUND: z.coerce.number().default(10),
	})
	.required();

export const validate = () => {
	const value = validationSchema.safeParse(env);
	if (!value.success) {
		throw new Error(`---${value.error.issues[0].path} :: ${value.error.issues[0].message.toUpperCase()}---`);
	}
	return value;
};

// export validate=

// class EnvVariableValidate {
// 	@IsNotEmpty()
// 	@IsString()
// 	POSTGRES_DB: string;

// 	@IsNotEmpty()
// 	@IsString()
// 	POSTGRES_USER: string;

// 	@IsNotEmpty()
// 	@IsString()
// 	POSTGRES_PASSWORD: string;

// 	@IsNotEmpty()
// 	@IsNumber()
// 	POSTGRES_PORT: number;

// 	@IsNotEmpty()
// 	@IsString()
// 	DB_HOST: string;

// 	@IsNotEmpty()
// 	@IsNumber()
// 	APP_PORT: number;
// }

// export function validate(config: Record<string, unknown>) {
// 	const validatedConfig = plainToInstance(EnvVariableValidate, config, { enableImplicitConversion: true });

// 	const errors = validateSync(validatedConfig, { skipMissingProperties: false });
// 	if (errors.length > 0) {
// 		console.log(errors[0].constraints);
// 		throw new Error(errors.toString());
// 	} else {
// 		console.log('validation succeed');
// 	}
// 	return validatedConfig;
// }
