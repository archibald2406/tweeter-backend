import {
  Controller,
  Get,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { TwitterRecordService } from './twitter-record.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('twitter-record')
export class TwitterRecordController {
  constructor(
    @Inject(TwitterRecordService)
    private readonly twitterRecordService: TwitterRecordService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.twitterRecordService.findAll();
  }
}
