import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

/** Entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/** Sessions */

/** Views */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/** Routers */
app.use("/admin", routerAdmin);
app.use("/", router);

export default app;
