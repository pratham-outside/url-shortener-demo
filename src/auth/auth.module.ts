import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: `${env.JWT_EXPIRATION}s` },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
