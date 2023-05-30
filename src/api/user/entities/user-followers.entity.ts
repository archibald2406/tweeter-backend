import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user-followers')
@Unique(['followerId', 'followingId'])
export class UserFollowersEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public followerId: number;

  @Column({ type: 'int' })
  public followingId: number;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followerId' })
  public follower?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingId' })
  public following?: UserEntity;
}
