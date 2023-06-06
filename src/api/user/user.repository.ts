import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEntityDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PostgresErrorCode } from 'src/shared/enums/postgres-error-code.enum';
import { FollowUserDto } from './dto/follow-user.dto';
import { UserFollowersEntity } from './entities/user-followers.entity';
import { FindUserOptions } from './interface/find-user-options.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserFollowersEntity)
    private readonly userFollowersRepository: Repository<UserFollowersEntity>,
  ) {}

  async getAll(): Promise<UserEntityDto[]> {
    return this.userRepository.find();
  }

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async getByIdUserNameEmail({ id, username, email }: FindUserOptions): Promise<UserEntity> {
    const where: FindOptionsWhere<UserEntity> = {};
    if (id) {
      where.id = id;
    }

    if (username) {
      where.username = username;
    }

    if (email) {
      where.email = email;
    }

    if (!Object.keys(where).length) {
      throw new BadRequestException('User find options should not be empty');
    }

    const user = await this.userRepository.findOne({
      where: [
        { id },
        { username },
        { email },
      ],
    });
    return user;
  }

  // TODO деструктуризация всех аргументов
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(
          // TODO: use constants
          'User with provided username or email already exist',
        );
      }
      throw new BadRequestException('Create user error');
    }
  }

  async followUser({ followerId, followingId }: FollowUserDto): Promise<UserFollowersEntity> {
    const follower = await this.userRepository.findOne({
      where: { id: followerId },
      relations: { following: true },
    });

    const following = await this.userRepository.findOne({
      where: { id: followingId },
      relations: { followers: true },
    });

    if (follower && following) {
      try {
        const res = await this.userFollowersRepository.save({
          followerId,
          followingId,
        });
        return res;
      } catch (error) {
        if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
          throw new ConflictException(
            // TODO: use constants
            'User is already following this user',
          );
        }
        throw new BadRequestException('Follow user error');
      }
    } else {
      throw new BadRequestException('No such follower or following exist');
    }
  }
}
