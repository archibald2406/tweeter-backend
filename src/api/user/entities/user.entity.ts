import { RecordLikeEntity } from 'src/api/record-like/entities/record-like.entity';
import { TwitterRecordEntity } from 'src/api/twitter-record/entities/twitter-record.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserFollowersEntity } from './user-followers.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: true, length: 15 })
  public username: string;

  @Column({ type: 'varchar', unique: true, length: 64 })
  public email: string;

  @Column({ type: 'varchar' })
  public password?: string;

  @Column({ type: 'varchar', length: 50 })
  public fullName: string;

  @OneToMany(() => TwitterRecordEntity, (twitterRecord) => twitterRecord.author)
  public twitterRecords?: TwitterRecordEntity[];

  @OneToMany(() => RecordLikeEntity, (recordLike) => recordLike.user)
  likes?: RecordLikeEntity[];

  @OneToMany(() => UserFollowersEntity, (follower) => follower.follower)
  followers?: UserFollowersEntity[];

  @OneToMany(() => UserFollowersEntity, (following) => following.following)
  following?: UserFollowersEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
