import { JwtFromRequestFunction } from "passport-jwt";

export interface IJwtOptions {
  jwtFromRequest: JwtFromRequestFunction
  secretOrKey: string
}