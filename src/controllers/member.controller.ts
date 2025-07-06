import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput, Member, LoginInput } from "../libs/types/member";
import Errors, { HttpCode } from "../libs/Errors";
const memberController: T = {};

const memberService = new MemberService();

memberController.getAdmin = async (req: Request, res: Response) => {
  try {
    console.log("Get Restaurant");
    const result = await memberService.getAdmin();
    res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.log("Error, GetAdmin", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body;
    const result: Member = await memberService.signup(input);

    res.json({ member: result });
  } catch (error) {
    console.log("Error: signup", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({})
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body;
    const result = await memberService.login(input);

    res.json({ member: result });
  } catch (error) {
    console.log("Error: login", error);
  }
};

export default memberController;
