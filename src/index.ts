import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

function createException(
  status: HttpStatus,
  errorCode: string,
  message: string
) {
  class CustomException extends HttpException {
    constructor() {
      super({ status, errorCode, message }, status);
      Object.setPrototypeOf(this, HttpException.prototype);
    }
  }
  return CustomException;
}

export default createException;
