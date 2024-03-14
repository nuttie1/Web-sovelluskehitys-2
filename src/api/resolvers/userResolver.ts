import fetchData from "../../functions/fetchData"
import { RegisterInput, UserOutput, LoginUser } from "../../types/DBTypes"
import { UserResponse, LoginResponse } from "../../types/MessageTypes";
import { MyContext } from "../../types/MyContext";
import { isLoggedIn } from "../../functions/authorize";

/**
 * This is the resolver for the user
 * @param users: Get all the users
 * @param userById: Get a user by their ID
 * @param register: Register a user (Creates the user)
 * @param login: Login a user
 * @param updateUser: Update a user
 * @param deleteUser: Delete a user
 * @param verifyPassword: Verify the password of a user
 * @returns The resolver for the user
 */

const userResolver = {
    Query: {
        users: async () => {
            return await fetchData<UserOutput[]>(
                `${process.env.AUTH_URL}/users`
            );
        },
        userById: async (_parent: undefined, args: {id: string}) => {
            return await fetchData<UserOutput>(
                `${process.env.AUTH_URL}/users/${args.id}`
            );
        },
        checkToken: async (_parent: undefined, _args: undefined, context: MyContext) => {
            return {user: context.userdata?.user};
        },
    },
    Mutation: {
        register: async (_parent: undefined, args: {user: RegisterInput}) => {
            return await fetchData<UserResponse> (
                `${process.env.AUTH_URL}/users`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(args.user)
                }
            );
        },
        login: async (_parent: undefined, args: {loginInput: {user_name: string, password: string}}) => {
            return await fetchData<LoginResponse> (
                `${process.env.AUTH_URL}/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(args.loginInput)
                }
            );
        },
        updateUser: async (_parent: undefined, args: {user: LoginUser}, context: MyContext) => {
            isLoggedIn(context);
            return await fetchData<UserResponse> (
                `${process.env.AUTH_URL}/users/${context.userdata?.user.id}`,
                {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${context.userdata?.token}`
                    },
                    body: JSON.stringify(args.user)
                }
            );
        },
        deleteUser: async (_parent: undefined, _args: undefined, context: MyContext) => {
            isLoggedIn(context);
            return await fetchData<UserResponse> (
                `${process.env.AUTH_URL}/users/${context.userdata?.user.id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${context.userdata?.token }`}
                }
            );
        },
        verifyPassword: async (_parent: undefined, args: {user_name: string, password: string}) => {
            console.log(args);
            return await fetchData<UserOutput>(
                `${process.env.AUTH_URL}/users/username/${args.user_name}`,
                {
                    method : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(args)
                },
            );
        },
    }
};

export default userResolver;
