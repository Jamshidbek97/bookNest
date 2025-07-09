import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import MemberService from "..//models/Member.service";
import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import { MemberType } from "../libs/types/enums/member.enum";
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

adminController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");

    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.ADMIN;

    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (error) {
    console.log("Error, Process Signup:", error);
    const message =
      error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG;
    res.send(`
        <script>
          alert("${message}");
          window.location.replace('/admin/signup');
        </script>
      `);
  }
};

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    console.log(req.body);

    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (error) {
    console.log("Error, Process Login:", error);
    const message =
      error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script> alert("${message}");  window.location.replace('/admin/signup');</script>`
    );
  }
};

adminController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");

    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (error) {
    console.log("Error,  Logout:", error);
    res.redirect("/admin");
  }
};

adminController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("get Users");
    const result = await memberService.getUsers();

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers", err);
    res.redirect("/admin/login");
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("Update chosen user");
    const result = await memberService.updateChosenUser(req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, update chosen user", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

adminController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("Check Authentication session");

    if (req.session?.member)
      res.send(
        `<script> alert("HI, ${req.session.member.memberNick}") </script>`
      );
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, Process Login:", err);
    res.send(err);
  }
};

adminController.verifyAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.ADMIN) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};

export default adminController;
