// src/seeds/CommentSeeder.ts
import { DataSource } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../user/entities/user.entity';
import { Track } from '../../track/entities/track.entity';

export default class CreateComments {
  public static async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const trackRepository = dataSource.getRepository(Track);

    const comments = Array(200)
      .fill(null)
      .map(async () => {
        const comment = new Comment();
        comment.content = faker.lorem.sentence();

        // Fetch random user and track from the database
        const randomUser = await userRepository.findOne({
          where: { id: faker.number.int({ min: 1, max: 10 }) }, // Replace with your actual range of user IDs
        });
        comment.user = randomUser;

        const randomTrack = await trackRepository.findOne({
          where: { id: faker.number.int({ min: 1, max: 150 }) }, // Replace with your actual range of track IDs
        });
        comment.track = randomTrack;

        return comment;
      });

    const createdComments = await Promise.all(comments);
    await dataSource.manager.save(createdComments);
  }
}
