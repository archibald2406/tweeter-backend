import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import {
  AUTHORIZATION_HEADER_NAME,
  JWTService,
} from '../services/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly publicRouteList = [
    'auth/sign-up',
    'auth/check-email-code',
    'auth/sign-in',
  ];

  constructor(private readonly jwtService: JWTService) { }

  async use(req: any, res: Response, next: Function) {
    if (this.isPublicRoute(req.baseUrl)) {
      next();
      return;
    }
    const token = <string>req.headers[AUTHORIZATION_HEADER_NAME];
    if (!token) {
      throw new UnauthorizedException();
    }
    const decode = await this.jwtService.checkToken(token);
    req['currentUser'] = decode;
    next();
    return;
  }

  isPublicRoute(askedRoute: string): boolean {
    return this.publicRouteList.find(publicRoute => {
      return askedRoute.includes(publicRoute);
    }) !== undefined;
  }
}
