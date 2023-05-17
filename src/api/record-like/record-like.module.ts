import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordLikeEntity } from './entities/record-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordLikeEntity])],
})
export class RecordLikeModule {}
