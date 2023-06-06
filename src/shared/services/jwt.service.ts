import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

export const AUTHORIZATION_HEADER_NAME = 'authorization';

export class JWTPayload {
  userId: number;
  email: string;
  ['refresh-token']: string;
}

@Injectable()
export class JWTService {
  logger = new Logger(JWTService.name);

  constructor (
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createToken(jwtPayload: JWTPayload, expiresIn = '1d'): string {
    return this.jwtService.sign(jwtPayload, {
      expiresIn,
      jwtid: uuid(),
      issuer: 'tweeter',
      algorithm: 'HS512',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  public async checkToken(token: string): Promise<JWTPayload> {
    try {
      return this.jwtService.verifyAsync(
        token.replace('Bearer ',''),
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        }
      );
    } catch (e) {
      this.logger.warn(`token invalid for ${token}`);
      throw new UnauthorizedException();
    }
  }
}
