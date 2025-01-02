// import { DataSource } from 'typeorm';
import { dataSource } from './orm.config';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
async function run() {
	//   const seedUser: User = { id: 'seed-user' };

	const seedId = Date.now()
		.toString()
		.split('')
		.reverse()
		.reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

	//   const opt = {
	//     dataSource,
	//     debug: true,
	//   };

	const connection = await dataSource.initialize();
	const userService = new UsersService(connection.getRepository(User));
	const user = {
		email: `${seedId}-seed-user_example@hey.com`,
		password: 'randompasswordhash',
		name: 'john doe',
		is_verified: false,
	};

	return await userService.create(user);
}

run()
	.then(() => console.log('...wait for script to exit'))
	.catch((error) => console.error('seed error', error));
