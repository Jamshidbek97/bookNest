import express from "express";
import libraryController from "./controllers/library.controller";

const routerAdmin = express.Router();

routerAdmin.get("/", libraryController.goHome);

routerAdmin.get("/login", libraryController.getLogin);
routerAdmin.get("/signup", libraryController.getSignup);

export default routerAdmin;
