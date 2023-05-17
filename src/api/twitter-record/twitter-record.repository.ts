import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwitterRecordEntity } from './entities/twitter-record.entity';
import { TwitterRecordEntityDto } from './dto/twitter-record.dto';

@Injectable()
export class TwitterRecordRepository {
  constructor(
    @InjectRepository(TwitterRecordEntity)
    private readonly twitterRecordRepository: Repository<TwitterRecordEntity>,
  ) {}

  async getAll(): Promise<TwitterRecordEntityDto[]> {
    return this.twitterRecordRepository.find();
  }
}
