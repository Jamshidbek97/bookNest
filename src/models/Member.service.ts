import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    try {
      const exist = await this.memberModel
        .findOne({ memberType: MemberType.ADMIN })
        .exec();
      if (exist) throw new Errors(HttpCode.FORBIDDEN, Message.CONFLICT);

      const result = await this.memberModel.create(input);
      const memberObj = result.toObject();
      memberObj.memberPassword = "";

      return memberObj as unknown as Member;
    } catch (error) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.MEMBER_REGISTERED);
    }
  }
}

export default MemberService;
