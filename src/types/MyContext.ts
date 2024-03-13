import {TokenContent} from './DBTypes';

/**
 * Represents the context of the user.
 * @property {TokenContent} userdata - The user's data.
 */
type MyContext = {
  userdata?: TokenContent;
};

export type {MyContext};
