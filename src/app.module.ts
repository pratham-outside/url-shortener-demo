import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { validate } from './config/env';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, validate }), DatabaseModule, UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
