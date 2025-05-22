import { MemberInput } from "../libs/types/member";
import MemberService from "..//models/Member.service";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { MemberType } from "../libs/enums/member.enum";

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");

    res.send("Home Page");
  } catch (error) {
    console.log("Error: goHome", error);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");

    res.send("Login Page");
  } catch (error) {
    console.log("Error: getLogin", error);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");

    res.send("Signup Page");
  } catch (error) {
    console.log("Error: getSignup", error);
  }
};

adminController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (error) {
    console.log("Error: processSignup", error);
  }
};

adminController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");

    res.send("processLogin Page");
  } catch (error) {
    console.log("Error: processLogin", error);
  }
};

export default adminController;
