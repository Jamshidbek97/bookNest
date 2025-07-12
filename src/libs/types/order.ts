import { ObjectId } from "mongoose";
import { BookStatus } from "./enums/book.enum";
import { Book } from "./book";

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  orderId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  memberId: ObjectId;
  orderStatus: BookStatus;
  createdAt: Date;
  updatedAt: Date;

  orderItems: OrderItem[];
  productData: Book[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: ObjectId;
  orderId?: ObjectId;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: BookStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: BookStatus;
}
