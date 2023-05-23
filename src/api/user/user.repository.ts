import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEntityDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PostgresErrorCode } from 'src/shared/enums/postgres-error-code.enum';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntityDto[]> {
    return this.userRepository.find({
      relations: { followers: true, following: true },
    });
  }

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

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

  async followUser({ followerId, followingId }: FollowUserDto): Promise<boolean> {
    return true;
  }
}
