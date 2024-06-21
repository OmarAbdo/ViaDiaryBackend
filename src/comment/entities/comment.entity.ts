import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Track } from '../../track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  content: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ApiProperty({ type: () => Track })
  @ManyToOne(() => Track, (track) => track.comments)
  track: Track;
}
