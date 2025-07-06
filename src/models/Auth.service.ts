import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretToken;
  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string;
  }

  public async createToken(payload: Member) {
    const secret = process.env.SECRET_TOKEN;
    if (!secret) {
      throw new Errors(
        HttpCode.INTERNAL_SERVER_ERROR,
        Message.MISSING_SECRET_TOKEN
      );
    }
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;
      jwt.sign(payload, secret, { expiresIn: duration }, (err, token) => {
        if (err)
          reject(
            new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
          );
        else resolve(token as string);
      });
    });
  }

  public async checkAuth(token: string): Promise<Member> {
    const result: Member = jwt.verify(token, this.secretToken) as Member;
    console.log(`--- [Auth] memberNick ${result.memberNick} ---`);
    return result;
  }
}

export default AuthService;
