export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum Message {
  SUCCESS = "Success",
  CREATED = "Resource successfully created",
  UPDATED = "Resource successfully updated",
  DELETED = "Resource successfully deleted",

  BAD_REQUEST = "Bad request",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden access",
  NOT_FOUND = "Resource not found",
  CONFLICT = "Conflict occurred",
  VALIDATION_ERROR = "Validation failed",

  INTERNAL_ERROR = "Internal server error",
  SERVICE_UNAVAILABLE = "Service unavailable",

  LOGIN_SUCCESS = "Login successful",
  LOGIN_FAILED = "Invalid credentials",
  LOGOUT_SUCCESS = "Logout successful",

  MEMBER_REGISTERED = "Member registered successfully",
  MEMBER_EXISTS = "Member already exists",
  MEMBER_NOT_FOUND = "Member not found",
  MISSING_SECRET_TOKEN = "Secret token is not found",
  INVALID_PASSWORD = "Invalid password",
  TOKEN_CREATION_FAILED = "Token creation is failed",
  BLOCKED_USER = "This user have been blocked",
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
