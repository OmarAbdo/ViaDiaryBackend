import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/entities/track.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handleFile(
    file: Express.Multer.File,
    title: string,
    description: string,
    userId: number,
  ): Promise<Track> {
    const track = new Track();
    track.title = title;
    track.description = description;
    track.filePath = file.path;

    // Fetch the user entity and set it to the track
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    track.user = user;

    return this.trackRepository.save(track);
  }
}
