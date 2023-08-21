import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension';

export default class UsersSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(User);

        await repository.insert([
            {
                username: 'hoyeon',
                name: 'Hoyeon Kim',
                password: '1234'
            }
        ])
    }
}