// src/seeds/PlaylistSeeder.ts
import { DataSource } from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../user/entities/user.entity';

export default class CreatePlaylists {
  public static async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const playlists = Array(50)
      .fill(null)
      .map(async () => {
        const playlist = new Playlist();
        playlist.name = faker.lorem.words(3);
        const randomUser = await userRepository.findOne({
          where: { id: faker.number.int({ min: 1, max: 10 }) },
        });
        playlist.user = randomUser;
        return playlist;
      });

    const createdPlaylists = await Promise.all(playlists);
    await dataSource.manager.save(createdPlaylists);
  }
}
