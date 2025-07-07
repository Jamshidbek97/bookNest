export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  NOT_MODIFIED = 304,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum Message {
  // General
  SUCCESS = "Success",
  CREATED = "Resource created",
  UPDATED = "Resource updated",
  DELETED = "Resource deleted",
  BAD_REQUEST = "Bad request",
  INTERNAL_ERROR = "Internal server error",
  SERVICE_UNAVAILABLE = "Service unavailable",

  // Auth
  LOGIN_SUCCESS = "Login successful",
  LOGIN_FAILED = "Invalid credentials",
  LOGOUT_SUCCESS = "Logout successful",
  TOKEN_MISSING = "Access token is missing",
  TOKEN_INVALID = "Invalid or expired token",
  TOKEN_CREATION_FAILED = "Token creation failed",
  BLOCKED_USER = "This user has been blocked",
  INVALID_PASSWORD = "Invalid password",
  CONFLICT = "Conflict occurred",

  // Member
  MEMBER_REGISTERED = "Member registered successfully",
  MEMBER_EXISTS = "Member already exists",
  MEMBER_NOT_FOUND = "Member not found",
  SOMETHING_WENT_WRONG = "Something went wrong",
  UPDATE_FAILED = "Update is failed",
  NOT_AUTHENTICATED = "You are not authenticated, Please login first",

  // Product
  PRODUCT_NOT_FOUND = "Product not found",
  PRODUCT_EXISTS = "Product already exists",
  PRODUCT_CREATED = "Product created successfully",
  PRODUCT_UPDATED = "Product updated successfully",
  PRODUCT_DELETED = "Product deleted",

  // Order
  ORDER_PLACED = "Order placed successfully",
  ORDER_NOT_FOUND = "Order not found",
  ORDER_EXISTS = "Order already exists",
  ORDER_CANCELED = "Order canceled successfully",

  // Review / Like
  REVIEW_ADDED = "Review added",
  REVIEW_EXISTS = "You already reviewed this item",
  LIKE_ADDED = "Like added",
  LIKE_REMOVED = "Like removed",
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;

  static standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.INTERNAL_ERROR,
  };

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    (this.code = statusCode), (this.message = statusMessage);
  }
}

export default Errors;
