import express from "express";
import adminController from "./controllers/admin.controller";
import makeUploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";

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

routerAdmin.get("/logout", adminController.logout);
routerAdmin.get("/check-me", adminController.checkAuthSession);

/* BOOKS */
routerAdmin.get(
  "/product/all",
  //: FIXME:
  // adminController.verifyAdmin,
  productController.getAllProducts
);
routerAdmin.post(
  "/product/create",
  //:FIXME:
  adminController.verifyAdmin,
  makeUploader("products").array("coverImages", 5),
  productController.createNewProduct
);
// routerAdmin.post(
//   "/product/:id",
//   adminController.verifyRestaurant,
//   adminController.updateChosenProduct
// );

// /* users */
// routerAdmin.get(
//   "/user/all",
//   adminController.verifyRestaurant,
//   adminController.getUsers
// );

// routerAdmin.post(
//   "/user/edit",
//   adminController.verifyRestaurant,
//   adminController.updateChosenUser
// );

export default routerAdmin;
