import {
  BadRequestCode,
  GetMsg,
  NotFoundCode,
  NotFoundMsg,
  OrderErrorMsg,
  SuccessCode,
  SuccessDeleteeMsg,
  SuccessLogin,
  SuccessPostMsg,
  SuccessRegister,
  SuccessUpdateMsg,
  GenericErrorCode,
  InvalidUserError,
  UnauthorizedErrorMsg,
  unauthorizedCode,
  NotAdminErrorMsg,
  ForbiddenErrorMsg,
  forbiddenCode,
  InvalidTokenErrorMsg,
} from "./constants.js";

export const successResponsePost = function (doc, route) {
  let message;
  if (route == "get") {
    message = GetMsg;
  } else if (route == "post") {
    message = SuccessPostMsg;
  } else if (route == "update") {
    message = SuccessUpdateMsg;
  } else {
    message = SuccessDeleteeMsg;
    doc = {};
  }
  var data = {
    code: SuccessCode,
    success: true,
    message: message,
    data: doc,
  };
  return data;
};

export const successRegister = function (doc) {
  var data = {
    code: SuccessCode,
    success: true,
    message: SuccessRegister,
    data: doc,
  };
  return data;
};

export const successToken = function (token) {
  var data = {
    code: SuccessCode,
    success: true,
    message: SuccessLogin,
    data: {},
    token: token,
  };
  return data;
};

export const notFoundResponse = function () {
  var data = {
    code: NotFoundCode,
    success: false,
    message: NotFoundMsg,
    data: {},
  };
  return data;
};
export const userValidationResponse = function (issue) {
  var data = {
    code: BadRequestCode,
    success: false,
    message: "Bad Request",
    UserMessage: issue,
  };
  return data;
};

export const validationResponse = function (issue) {
  var data = {
    code: BadRequestCode,
    success: false,
    message: "Bad Request",
    UserMessage: issue,
  };
  return data;
};
export const errorResponse = function (res) {
  var data = {
    code: GenericErrorCode,
    success: false,
    UserMessage: OrderErrorMsg,
  };
  return res.status(500).json(data);
};
export const apiErrorResponse = function (res, msg) {
  var data = {
    code: GenericErrorCode,
    success: false,
    message: msg,
  };
  return res.status(500).json(data);
};

export const unauthorizedResponse = function (auth) {
  let message;
  if (auth == "password") {
    message = InvalidUserError;
  } else {
    message = InvalidTokenErrorMsg;
  }
  var data = {
    code: unauthorizedCode,
    success: false,
    message: UnauthorizedErrorMsg,
    UserMessage: message,
  };
  return data;
};
export const forbiddenResponse = function () {
  var data = {
    code: forbiddenCode,
    success: false,
    message: ForbiddenErrorMsg,
    UserMessage: NotAdminErrorMsg,
  };
  return data;
};
