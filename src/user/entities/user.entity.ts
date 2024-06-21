import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Track } from '../../track/entities/track.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty({ type: () => [Track] })
  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];

  @ApiProperty({ type: () => [Playlist] })
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
