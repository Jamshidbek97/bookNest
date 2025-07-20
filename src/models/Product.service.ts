import { BookStatus } from "../libs/types/enums/book.enum";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Book,
  BookInput,
  BookInquiry,
  BookUpdateInput,
} from "../libs/types/book";
import BookModel from "../schema/Book.model";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/types/enums/view.enum";

class ProductService {
  private readonly productModel;
  public viewService;

  constructor() {
    this.productModel = BookModel;
    this.viewService = new ViewService();
  }

  /* SPA  */
  public async getProducts(inquiry: BookInquiry): Promise<Book[]> {
    const match: T = {
      status: { $in: [BookStatus.AVAILABLE, BookStatus.PREORDER] },
    };
    if (inquiry.genre) match.genre = inquiry.genre;

    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sortKey = inquiry.order ?? "price";
    const sort: T = sortKey === "price" ? { [sortKey]: 1 } : { [sortKey]: -1 };

    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();

    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.PRODUCT_NOT_FOUND);
    return result;
  }

  public async getProduct(
    memberId: ObjectId | null,
    id: string
  ): Promise<Book> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.productModel
      .findOne({
        _id: productId,
        status: { $in: [BookStatus.AVAILABLE, BookStatus.PREORDER] },
      })
      .exec();

    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.PRODUCT_NOT_FOUND);

    if (memberId) {
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };
      const existView = await this.viewService.checkViewExistence(input);

      if (!existView) {
        await this.viewService.insertMemberView(input);
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true }
          )
          .exec();
      }
    }

    return result?.toJSON() as Book;
  }

  /* SSR  */

  public async getAllProducts(): Promise<Book[]> {
    const result = (await this.productModel
      .find()
      .lean()
      .exec()) as unknown as Book[];

    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.PRODUCT_NOT_FOUND);

    return result;
  }

  public async createNewProduct(input: BookInput): Promise<Book> {
    try {
      const created = await this.productModel.create(input);
      const result = await this.productModel
        .findById(created._id)
        .lean()
        .exec();

      if (!result)
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      return result as unknown as Book;
    } catch (err) {
      console.error("Error, model:createNewProduct", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: BookUpdateInput
  ): Promise<Book> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findByIdAndUpdate({ _id: id }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result.toJSON() as Book;
  }
}

export default ProductService;
