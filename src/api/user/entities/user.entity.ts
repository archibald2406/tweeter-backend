import { RecordLikeEntity } from 'src/api/record-like/entities/record-like.entity';
import { TwitterRecordEntity } from 'src/api/twitter-record/entities/twitter-record.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: true })
  public username: string;

  @Column({ type: 'varchar' })
  public password?: string;

  @Column({ type: 'varchar' })
  public firstName: string;

  @Column({ type: 'varchar' })
  public lastName: string;

  @OneToMany(() => TwitterRecordEntity, (twitterRecord) => twitterRecord.author)
  public twitterRecords?: TwitterRecordEntity[];

  @OneToMany(() => RecordLikeEntity, (recordLike) => recordLike.user)
  likes?: RecordLikeEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_followers',
    joinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'following_id',
      referencedColumnName: 'id',
    },
  })
  followers?: UserEntity[];
}
