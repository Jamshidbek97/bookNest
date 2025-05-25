import { LoginInput, MemberInput } from "../libs/types/member";
import MemberService from "..//models/Member.service";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message, HttpCode } from "../libs/Errors";

const adminController: T = {};

const memberService = new MemberService();

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");

    res.render("home");
  } catch (error) {
    console.log("Error: goHome", error);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");

    res.render("signup");
  } catch (error) {
    console.log("Error: getSignup", error);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");

    res.render("login");
  } catch (error) {
    console.log("Error: getLogin", error);
  }
};

adminController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;

    const result = await memberService.processSignup(newMember);

    res.status(HttpCode.CREATED).json({
      message: Message.MEMBER_REGISTERED,
      data: result,
    });
  } catch (error) {
    console.error("Error: processSignup", error);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: Message.INTERNAL_ERROR,
    });
  }
};

adminController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log(req.body);

    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);

    res.status(HttpCode.OK).json({
      message: Message.LOGIN_SUCCESS,
      data: result,
    });
    res.status(HttpCode.OK).json({
      message: Message.LOGIN_SUCCESS,
      data: result,
    });
  } catch (error) {
    console.log("Error: processLogin", error);
  }
};

export default adminController;
