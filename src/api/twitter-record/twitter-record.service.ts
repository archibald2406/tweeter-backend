import { Injectable } from '@nestjs/common';
import { TwitterRecordRepository } from './twitter-record.repository';
import { TwitterRecordEntityDto } from './dto/twitter-record.dto';

@Injectable()
export class TwitterRecordService {
  constructor(private readonly twitterRecordRepo: TwitterRecordRepository) {}

  findAll(): Promise<TwitterRecordEntityDto[]> {
    return this.twitterRecordRepo.getAll();
  }
}
