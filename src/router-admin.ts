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
  // adminController.verifyAdmin,
  productController.getAllProducts
);
// routerAdmin.post(
//   "/product/create",
//   adminController.verifyRestaurant,
//   // uploadProductImage.single("productImage"),
//   makeUploader("products").array("productImages", 5),
//   adminController.createNewProduct
// );
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
