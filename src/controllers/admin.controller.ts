import { T } from "../libs/types/common";
import { Request, Response } from "express";

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

adminController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");

    res.send("processSignup Page");
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
