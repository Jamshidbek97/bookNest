import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA */
  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";

      return result.toJSON() as Member;
    } catch (error) {
      console.log("Error: signup", error);

      throw new Errors(HttpCode.BAD_REQUEST, Message.MEMBER_EXISTS);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.MEMBER_NOT_FOUND);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.INVALID_PASSWORD);

    const result = await this.memberModel.findById(member._id).lean().exec();

    return result as unknown as Member;
  }

  /** SSR */
  public async processSignup(input: MemberInput): Promise<Member> {
    try {
      // const exist = await this.memberModel
      //   .findOne({ memberType: MemberType.ADMIN })
      //   .exec();
      // if (exist) throw new Errors(HttpCode.FORBIDDEN, Message.CONFLICT);

      const salt = await bcrypt.genSalt();
      input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
      const result = await this.memberModel.create(input);
      const memberObj = result.toObject();
      memberObj.memberPassword = "";

      return memberObj as unknown as Member;
    } catch (error) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.INTERNAL_ERROR);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.MEMBER_NOT_FOUND);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.INVALID_PASSWORD);

    const result = await this.memberModel.findById(member._id).exec();

    return result as unknown as Member;
  }
}

export default MemberService;
