import { UserEntityDto } from 'src/api/user/dto/user.dto';
import { UserEntity } from 'src/api/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export const toUserEntityDto = (data: UserEntity): UserEntityDto => {
  const { id, username, email, fullName } = data;

  const userDto: UserEntityDto = {
    id,
    username,
    email,
    fullName,
  };

  return userDto;
};

export const comparePasswords = async (userPassword: string, currentPassword: string) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
