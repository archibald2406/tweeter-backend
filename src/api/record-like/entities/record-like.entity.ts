import { TwitterRecordEntity } from 'src/api/twitter-record/entities/twitter-record.entity';
import { UserEntity } from 'src/api/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('record-like')
@Unique(['recordId', 'userId'])
export class RecordLikeEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public recordId: number;

  @Column({ type: 'int' })
  public userId: number;

  @ManyToOne(() => TwitterRecordEntity, (record) => record.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recordId' })
  public record?: TwitterRecordEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user?: UserEntity;
}
