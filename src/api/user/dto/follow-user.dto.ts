import { IsNotEmpty, IsInt } from 'class-validator';

export class FollowUserDto {
  @IsNotEmpty()
  @IsInt()
  followerId: number;

  @IsNotEmpty()
  @IsInt()
  followingId: number;
}
