import {Request} from 'express';
import jwt from 'jsonwebtoken';
import {LoginUser, TokenContent} from '../types/DBTypes';
import {MyContext} from '../types/MyContext';

/**
 * This is the authentication function.
 * It checks the existence of the token in the request header.
 * @param req: The request
 * @returns The user's context
 */
export default async (req: Request): Promise<MyContext> => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const userFromToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as LoginUser;
      if (!userFromToken) {
        console.log("NOT VERIFIED");
        return {};
      }
      const tokenContent: TokenContent = {
        token: token,
        user: userFromToken,
      };
      return {userdata: tokenContent};
    } catch (error) {
      return {};
    }
  }
  return {};
};

