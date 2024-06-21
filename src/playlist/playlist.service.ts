import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = this.playlistRepository.create(createPlaylistDto);
    await this.playlistRepository.save(newPlaylist);
    return newPlaylist;
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find();
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    await this.playlistRepository.update(id, updatePlaylistDto);
    return this.playlistRepository.findOne({ where: { id } });
  }

  remove(id: number): Promise<void> {
    return this.playlistRepository.delete(id).then(() => null);
  }
}
