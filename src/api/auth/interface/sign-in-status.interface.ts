import { JWTPayload } from 'src/shared/services/jwt.service';

export class SignInStatus {
  ['access-token']: string;
  jwtPayload: JWTPayload;
}
