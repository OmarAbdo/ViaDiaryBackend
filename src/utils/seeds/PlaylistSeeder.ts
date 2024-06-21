// src/seeds/PlaylistSeeder.ts
import { DataSource } from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../user/entities/user.entity';
import { Track } from '../../track/entities/track.entity'; // import Track entity

export default class CreatePlaylists {
  public static async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const trackRepository = dataSource.getRepository(Track); // get Track repository

    const playlists = Array(50)
      .fill(null)
      .map(async () => {
        const playlist = new Playlist();
        playlist.name = faker.lorem.words(3);
        const randomUser = await userRepository.findOne({
          where: { id: faker.number.int({ min: 1, max: 10 }) },
        });
        playlist.user = randomUser;

        // add tracks to playlist
        const randomTracks = await trackRepository.find({
          where: { id: faker.number.int({ min: 1, max: 10 }) },
        });
        playlist.tracks = randomTracks;

        return playlist;
      });

    const createdPlaylists = await Promise.all(playlists);
    await dataSource.manager.save(createdPlaylists);
  }
}
