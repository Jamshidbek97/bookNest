import mongoose from "mongoose";
import { BookGenre, BookFormat } from "./enums/book.enum";

export interface Book {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: string;
  genre: BookGenre;
  price: number;
  stockCount: number;
  format?: BookFormat;
  pageCount?: number;
  description?: string;
  coverImages?: string[];
  timesBorrowed?: number;
  bookViews: number;
  bookLikes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookInput {
  title: string;
  author: string;
  genre: BookGenre;
  price: number;
  stockCount: number;
  format?: BookFormat;
  pageCount?: number;
  description?: string;
  coverImages?: string[];
  timesBorrowed?: number;
}

export interface BookUpdateInput extends Partial<BookInput> {
  _id: string | mongoose.Types.ObjectId;
}

export interface BookInquiry {
  order?: string;
  page: number;
  limit: number;
  genre?: BookGenre;
  search?: string;
}
