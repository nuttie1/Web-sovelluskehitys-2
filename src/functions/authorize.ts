import {GraphQLError} from 'graphql';
import {MyContext} from '../types/MyContext';

/**
 * This function checks if the user is logged in
 * By checking if the user's data exists in the context
 * @param context The user's context
 */
const isLoggedIn = (context: MyContext): void => {
    if (!context.userdata) {
        throw new GraphQLError('Not authenticated', {
            extensions: {
                code: 'UNAUTHORIZED',
                http: {
                    status: 401,
                },
            },
        });
    }
};

/**
 * This function checks if the user is an admin
 * By checking if the user's role is admin
 * @param context The user's context
 */
const isAdmin = (context: MyContext): void => {
    isLoggedIn(context);
    if (context.userdata && context.userdata.user.role !== 'admin') {
        throw new GraphQLError('Not authorized', {
            extensions: {
                code: 'UNAUTHORIZED',
                http: {
                    status: 401,
                },
            },
        });
    }
};

export {isLoggedIn, isAdmin};