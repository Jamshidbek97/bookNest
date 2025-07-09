import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import { AUTH_TIMER, MORGAN_FORMAT } from "./libs/config";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/** Entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** Sessions */
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: AUTH_TIMER * 1000 * 60 * 60,
    },
    store: store,
    resave: true,
    // secure: false
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

/** Views */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/** Routers */
app.use("/admin", routerAdmin);
app.use("/", router);

export default app;
