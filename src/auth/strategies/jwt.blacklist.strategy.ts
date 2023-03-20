import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { tokenBlacklist } from '../blacklist';
import { Request } from 'express';

@Injectable()
export class JwtBlacklistStrategy extends PassportStrategy(
  Strategy,
  'jwt-blacklist',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(request: Request, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (tokenBlacklist.has(token as string)) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    return { id: payload.sub, email: payload.email };
  }
}
