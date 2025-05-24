import express from "express";
import memberController from "./controllers/member.controller";

const router = express.Router();

router.post("/signup", memberController.signup);

router.post("/login", memberController.login);

export default router;
