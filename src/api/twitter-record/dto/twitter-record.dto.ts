import { ImageEntity } from 'src/api/image/entities/image.entity';
import { UserEntity } from 'src/api/user/entities/user.entity';
import { TwitterRecordEntity } from '../entities/twitter-record.entity';

export class TwitterRecordEntityDto implements TwitterRecordEntity {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  isComment: boolean;
  author?: UserEntity;
  parentRecordAuthor?: UserEntity;
  parentRecord?: TwitterRecordEntity;
  images?: ImageEntity[];
}
