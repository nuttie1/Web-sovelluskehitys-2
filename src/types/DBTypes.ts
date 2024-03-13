import { Document, Types } from 'mongoose';

/**
 * Represents a User in the system.
 * @property {Types.ObjectId | string} id - The unique identifier for the user.
 * @property {string} user_name - The username of the user.
 * @property {"user" | "admin"} role - The role of the user.
 * @property {string} password - The password of the user.
 * @property {number} points - The points of the user.
 */
type User = Partial<Document> & {
    id: Types.ObjectId | string;
    user_name: string;
    role: "user" | "admin";
    password: string;
    points: number;
};

/**
 * Represents a User in the system without the password and role.
 * Used in resolvers to return the user without the password and role.
 */
type UserOutput = Omit<User, 'password' | 'role'>;

/**
 * Represents a User in the system without the password.
 */
type LoginUser = Omit<User, 'password'>;

/**
 * Represents the input for the register mutation.
 */
type RegisterInput = Omit<User, "id" | "role">;

/**
 * Represents a Test User in the system.
 * Used in tests to create a user.
 */
type UserTest = Partial<User>;

/**
 * Represents the content of the token.
 * @property {string} token - The token.
 * @property {LoginUser} user - The user.
 */
type TokenContent = {
    token: string;
    user: LoginUser;
};

/**
 * Represents a CS2 player in the system.
 * @property {Types.ObjectId | string} id - The unique identifier for the player.
 * @property {string} name - The name of the player.
 * @property {string} team - The team the player is on.
 * @property {string} country - The country the player is from.
 * @property {number} age - The age of the player.
 * @property {"rifler" | "awper" | "igl"} role - The role of the player.
 * @property {number} total_winnings - The total winnings of the player.
 */
type csPlayer = Partial<Document> & {
    id: Types.ObjectId | string;
    name: string;
    team: string;
    country: string;
    age: number;
    role: "rifler" | "awper" | "igl";
    total_winnings: number;
};

/**
 * Represents a Test CS2 player in the system.
 * Used in tests to create a CS2 player.
 */
type csPlayerTest = Partial<csPlayer>;

export type { User, csPlayer, UserOutput, RegisterInput, TokenContent, LoginUser, UserTest, csPlayerTest};
