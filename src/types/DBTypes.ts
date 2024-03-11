import { Document, Types } from 'mongoose';

type User = Partial<Document> & {
    id: Types.ObjectId | string;
    user_name: string;
    role: "user" | "admin";
    password: string;
    points: number;
};

type UserOutput = Omit<User, 'password' | 'role'>;

type LoginUser = Omit<User, 'password'>;

type RegisterInput = Omit<User, "id" | "role">;

type UserTest = Partial<User>;

type TokenContent = {
    token: string;
    user: LoginUser;
};

type csPlayer = Partial<Document> & {
    id: Types.ObjectId | string;
    name: string;
    team: string;
    country: string;
    age: number;
    role: "rifler" | "awper" | "igl";
    total_winnings: number;
};

export type { User, csPlayer, UserOutput, RegisterInput, TokenContent, LoginUser, UserTest};
