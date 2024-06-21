// src/seeds/TrackSeeder.ts
import { DataSource } from 'typeorm';
import { Track } from '../../track/entities/track.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../user/entities/user.entity';

export default class CreateTracks {
  public static async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const tracks = Array(150)
      .fill(null)
      .map(async () => {
        const track = new Track();
        track.title = faker.lorem.words(3);
        track.description = faker.lorem.sentence();
        track.filePath = faker.internet.url();
        const randomUser = await userRepository.findOne({
          where: { id: faker.number.int({ min: 1, max: 10 }) },
        });
        track.user = randomUser;
        return track;
      });

    const createdTracks = await Promise.all(tracks);
    await dataSource.manager.save(createdTracks);
  }
}
