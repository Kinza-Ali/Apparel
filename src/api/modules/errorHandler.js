import { apiErrorResponse } from "./apiResponses.js";

export const apiErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  let errMsg = error.message || error.toString();
  res.send(apiErrorResponse(res, errMsg));
};
