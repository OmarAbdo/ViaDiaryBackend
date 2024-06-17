import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  filePath: string;

  @ManyToOne(() => User, (user) => user.tracks)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];
}
