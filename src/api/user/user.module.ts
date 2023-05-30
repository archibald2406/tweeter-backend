import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserFollowersEntity } from './entities/user-followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    UserFollowersEntity,
  ])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
