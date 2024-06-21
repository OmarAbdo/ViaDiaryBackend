import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Track } from '../../track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Playlist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  @ApiProperty({ type: () => [Track] })
  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];
}
