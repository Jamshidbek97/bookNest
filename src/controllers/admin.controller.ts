import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (error) {
    console.log("Error: goHome", error);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (error) {
    console.log("Error: getLogin", error);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (error) {
    console.log("Error: getSignup", error);
  }
};

export default adminController;
