import express from "express";
import adminController from "./controllers/admin.controller";
import makeUploader from "./libs/utils/uploader";

const routerAdmin = express.Router();

/** ADMIN */

routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

routerAdmin
  .get("/signup", adminController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    adminController.processSignup
  );

/** BOOKS */

/** USER */
export default routerAdmin;
