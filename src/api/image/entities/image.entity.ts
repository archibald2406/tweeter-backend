import { TwitterRecordEntity } from 'src/api/twitter-record/entities/twitter-record.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int', nullable: true })
  public twitterRecordId?: number;

  @ManyToOne(() => TwitterRecordEntity, (twitterRecord) => twitterRecord.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'twitterRecordId' })
  public twitterRecord?: TwitterRecordEntity;
}
