import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  filePath: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.tracks)
  user: User;

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];
}
