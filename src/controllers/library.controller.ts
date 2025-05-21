import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const libraryController: T = {};

libraryController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (error) {
    console.log("Error: goHome", error);
  }
};

libraryController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (error) {
    console.log("Error: getLogin", error);
  }
};

libraryController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (error) {
    console.log("Error: getSignup", error);
  }
};

export default libraryController;
