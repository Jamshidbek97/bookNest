import express from "express";
import adminController from "./controllers/admin.controller";

const routerAdmin = express.Router();

/** ADMIN */

routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

routerAdmin
  .get("/signup", adminController.getSignup)
  .post("/signup", adminController.processSignup);

/** BOOKS */

/** USER */
export default routerAdmin;
