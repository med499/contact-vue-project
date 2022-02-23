import { HTTP_EXCEPTION } from ".";

export default function HttpException(message) {
  this.name = HTTP_EXCEPTION;
  this.message = message;
  this.stack = new Error().stack;
}
HttpException.prototype = new Error();
