import express from "express";
import adminController from "./controllers/admin.controller";

const routerAdmin = express.Router();

routerAdmin.get("/", adminController.goHome);

routerAdmin.get("/login", adminController.getLogin);
routerAdmin.get("/signup", adminController.getSignup);

export default routerAdmin;
