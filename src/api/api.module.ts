import { Module } from '@nestjs/common';
import { TwitterRecordModule } from './twitter-record/twitter-record.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { RecordLikeModule } from './record-like/record-like.module';

@Module({
  imports: [
    UserModule,
    TwitterRecordModule,
    ImageModule,
    RecordLikeModule,
  ]
})
export class ApiModule {}
