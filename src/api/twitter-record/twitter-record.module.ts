import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitterRecordEntity } from './entities/twitter-record.entity';
import { TwitterRecordController } from './twitter-record.controller';
import { TwitterRecordService } from './twitter-record.service';
import { TwitterRecordRepository } from './twitter-record.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TwitterRecordEntity])],
  controllers: [TwitterRecordController],
  providers: [TwitterRecordService, TwitterRecordRepository],
})
export class TwitterRecordModule {}
