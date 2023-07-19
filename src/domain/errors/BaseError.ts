import { ErrorCodes } from "./ErrorCodes";

export abstract class BaseError extends Error {
  abstract code: ErrorCodes;
}
