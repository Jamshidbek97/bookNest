import { T } from "../libs/types/enums/member.enum";
import { Request, Response } from "express";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (error) {
    console.log("Error: goHome", error);
  }
};

memberController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (error) {
    console.log("Error: getLogin", error);
  }
};

memberController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (error) {
    console.log("Error: getSignup", error);
  }
};

export default memberController;
