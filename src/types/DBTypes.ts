import { Document, Types } from 'mongoose';

type User = Partial<Document> & {
    id: Types.ObjectId | string;
    user_name: string;
    email: string;
    role: "user" | "admin";
    password: string;
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


export type { User, csPlayer };
