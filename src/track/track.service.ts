import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) { }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = this.trackRepository.create(createTrackDto);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  findOne(id: number): Promise<Track> {
    return this.trackRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.trackRepository.update(id, updateTrackDto);
    return this.trackRepository.findOne({ where: { id } });
  }

  remove(id: number): Promise<void> {
    return this.trackRepository.delete(id).then(() => null);
  }
}