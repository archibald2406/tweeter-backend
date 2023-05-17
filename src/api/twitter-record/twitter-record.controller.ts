import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';
import { TwitterRecordService } from './twitter-record.service';

@Controller('twitter-record')
export class TwitterRecordController {
  constructor(
    @Inject(TwitterRecordService)
    private readonly twitterRecordService: TwitterRecordService,
  ) {}

  @Get()
  findAll() {
    return this.twitterRecordService.findAll();
  }
}
