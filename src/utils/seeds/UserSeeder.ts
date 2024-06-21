// src/seeds/UserSeeder.ts
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { faker } from '@faker-js/faker';

export default class CreateUsers {
  public static async run(dataSource: DataSource): Promise<any> {
    const users = Array(20)
      .fill(null)
      .map(() => {
        const user = new User();
        user.email = faker.internet.email();
        user.password = faker.internet.password();
        user.username = faker.internet.userName();
        return user;
      });

    await dataSource.manager.save(users);
  }
}
