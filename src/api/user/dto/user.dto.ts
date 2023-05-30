import { RecordLikeEntity } from 'src/api/record-like/entities/record-like.entity';
import { TwitterRecordEntity } from 'src/api/twitter-record/entities/twitter-record.entity';
import { UserEntity } from '../entities/user.entity';
import { UserFollowersEntity } from '../entities/user-followers.entity';

export class UserEntityDto {
  id: number;
  username: string;
  email: string;
  password?: string;
  fullName: string;
  twitterRecords?: TwitterRecordEntity[];
  likes?: RecordLikeEntity[];
  followers?: UserFollowersEntity[];
  following?: UserFollowersEntity[];
}
