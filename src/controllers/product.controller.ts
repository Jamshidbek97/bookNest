import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";
import ProductService from "../models/Product.service";
import { BookInput, BookInquiry } from "../libs/types/book";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { BookGenre } from "../libs/types/enums/book.enum";

const productService = new ProductService();
const productController: T = {};

/* SPA  */
productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log(" Get products");
    const { page, limit, order, bookGenre, search } = req.query;

    const inquiry: BookInquiry = {
      order: String(order),
      page: Number(page) || 1,
      limit: Number(limit) || 8,
    };

    if (bookGenre) inquiry.genre = bookGenre as BookGenre;

    if (search) inquiry.search = String(search);

    const result = await productService.getProducts(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error,  get  products:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// productController.getProduct = async (req: ExtendedRequest, res: Response) => {
//   try {
//     console.log(" Get product");

//     const { id } = req.params;

//     const memberId = req.member?._id ?? null,
//       result = await productService.getProduct(memberId, id);

//     res.status(HttpCode.OK).json(result);
//   } catch (err) {
//     console.log("Error,  get  product:", err);
//     if (err instanceof Errors) res.status(err.code).json(err);
//     else res.status(Errors.standard.code).json(Errors.standard);
//   }
// };

// /* SSR  */

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log(" Get all products");
    const data = await productService.getAllProducts();

    res.render("products", { books: data });
  } catch (err) {
    console.log("Error,  get all products:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log(" create new products");
    console.log("req.body: ", req.body);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: BookInput = req.body;
    data.coverImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    await productService.createNewProduct(data);

    res.send(
      `<script> alert("Successfully created"); window.location.replace('/admin/product/all') </script> `
    );
  } catch (err) {
    console.log("Error,  Create new Product:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/product/all') </script> `
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log(" update product 11");
    const id = req.params.id;
    console.log("Id:", id);
    console.log("req.body", req.body);

    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error,  update product:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
