import fetchData from "../../functions/fetchData"
import { RegisterInput, UserOutput, LoginUser } from "../../types/DBTypes"
import { UserResponse, LoginResponse } from "../../types/MessageTypes";
import { MyContext } from "../../types/MyContext";

export default {
    Query: {
        users: async () => {
            return await fetchData<UserOutput[]>(
                `${process.env.AUTH_URL}/users`
            );
        },
        userById: async (_parent: undefined, args: {id: string}) => {
            return await fetchData<UserOutput>(
                `${process.env.AUTH_URL}/users${args.id}`
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
        login: async (_parent: undefined, args: {loginInput: {username: string, password: string}}) => {
            console.log(args.loginInput);
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
            return await fetchData<UserResponse> (
                `${process.env.AUTH_URL}/users/${context.userdata?.user.id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${context.userdata?.token }`}
                }
            );
        },
    }
};