import {UserOutput} from './DBTypes';

/**
 * Represents the response of a message.
 * @property {string} message - The message.
 */
type MessageResponse = {
  message: string;
};

/**
 * Represents the response of an error.
 * @property {string} stack - The stack trace of the error.
 */
type ErrorResponse = MessageResponse & {
  stack?: string;
};

/**
 * Represents the response of a user.
 * @property {UserOutput} user - The user.
 */
type UserResponse = MessageResponse & {
  user: UserOutput;
};

/**
 * Represents the response of a login.
 * @property {string} token - The token.
 * @property {UserOutput} user - The user.
 */
type LoginResponse = MessageResponse & {
  token: string;
  user: UserOutput;
};

export type {
  MessageResponse,
  ErrorResponse,
  UserResponse,
  LoginResponse,
};
