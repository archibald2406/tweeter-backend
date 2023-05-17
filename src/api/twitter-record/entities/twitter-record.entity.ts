import { ImageEntity } from 'src/api/image/entities/image.entity';
import { RecordLikeEntity } from 'src/api/record-like/entities/record-like.entity';
import { UserEntity } from 'src/api/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('twitter-record')
export class TwitterRecordEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text' })
  public text: string;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column({ type: 'boolean' })
  public isComment: boolean;

  @Column({ type: 'int', nullable: true })
  public authorId?: number;

  @ManyToOne(() => UserEntity, (user) => user.twitterRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId' })
  public author?: UserEntity;

  @Column({ type: 'int', nullable: true })
  public parentRecordAuthorId?: number;

  @ManyToOne(() => UserEntity, (user) => user.twitterRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentRecordAuthorId' })
  public parentRecordAuthor?: UserEntity;

  @Column({ type: 'int', nullable: true })
  public parentRecordId?: number;

  @ManyToOne(() => TwitterRecordEntity, (parentRecord) => parentRecord.parentRecord, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentRecordId' })
  public parentRecord?: TwitterRecordEntity;

  @OneToMany(() => ImageEntity, (image) => image.twitterRecord)
  public images?: ImageEntity[];

  @OneToMany(() => RecordLikeEntity, (recordLike) => recordLike.record)
  likes?: RecordLikeEntity[];
}
