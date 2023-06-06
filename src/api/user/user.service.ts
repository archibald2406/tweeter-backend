import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntityDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserEntityDto } from 'src/api/user/utils/user.util';
import { FollowUserDto } from './dto/follow-user.dto';
import { UserFollowersEntity } from './entities/user-followers.entity';
import { FindUserOptions } from './interface/find-user-options.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll(): Promise<UserEntityDto[]> {
    return this.userRepo.getAll();
  }

  async findgetByIdUserNameEmail(options: FindUserOptions): Promise<UserEntity> {
    const user = await this.userRepo.getByIdUserNameEmail(options);
    return user;
  }

  async create(UserEntityDto: CreateUserDto): Promise<UserEntityDto> {
    const { username } = UserEntityDto;

    const userInDb = await this.userRepo.getByUsername(username);
    if (userInDb) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userRepo.create(UserEntityDto);

    return toUserEntityDto(user);
  }

  async followUser(followUserDto: FollowUserDto): Promise<UserFollowersEntity> {
    return this.userRepo.followUser(followUserDto);
  }

  async findByPayload({ email }: any): Promise<UserEntity> {
    return await this.findgetByIdUserNameEmail({ email });
  }
}
