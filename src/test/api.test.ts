import client from '../client';
import request from 'supertest';
import { LoginResponse } from '../types/MessageTypes';
import { UserTest } from '../types/DBTypes';

describe('User API', () => {
    let token: string;

    let user: LoginResponse;

    const testUser: UserTest = {
        user_name: 'test' + Math.floor(Math.random() * 1000),
        password: 'test' + Math.floor(Math.random() * 1000),
    };

    it('should register a user', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    mutation Register($user: RegisterInput!) {
                        register(user: $user) {
                            user {
                                id
                                user_name
                            }
                        }
                    }
                `,
                variables: {
                    user: testUser,
                },
            });

        expect(response.body.data.register.user.user_name).toBe(testUser.user_name);
        token = response.body.data.register.token;
    });

    it('should login a user', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    mutation Login($loginInput: LoginInput!) {
                        login(loginInput: $loginInput) {
                            token
                            user {
                                id
                                user_name
                            }
                        }
                    }
                `,
                variables: {
                    loginInput: testUser,
                },
            });
        console.log(response.body);
        const userData = response.body.data.login;
        expect(response.body.data.login.user.user_name).toBe(testUser.user_name);
        expect(userData).toHaveProperty("token");
        expect(userData).toHaveProperty("user");
        expect(userData.user).toHaveProperty("id");
        user = response.body.data.login;
        token = response.body.data.login.token;
    });

    it('should get all users', async () => {
        const response = await request(client)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    query {
                        users {
                            id
                            user_name
                        }
                    }
                `,
            });
        const users = response.body.data.users;
        expect(users).toBeInstanceOf(Array);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('user_name');
    });

    it('should get a user by id', async () => {
        const response = await request(client)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    query UserById($id: ID!) {
                        userById(id: $id) {
                            id
                            user_name
                        }
                    }
                `,
                variables: {
                    id: user.user.id,
                },
            });

        expect(response.body.data.userById.user_name).toBe(testUser.user_name);
    });

    it('should verify a password', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    mutation VerifyPassword($user_name: String!, $password: String!) {
                        verifyPassword(user_name: $user_name, password: $password)
                    }
                `,
                variables: {
                    user_name: testUser.user_name,
                    password: testUser.password,
                },
            });

        expect(response.body.data.verifyPassword).toBe(true);
    });

    it('should update a user', async () => {
        const response = await request(client)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation UpdateUser($user: UpdateUserInput!) {
                        updateUser(user: $user) {
                            user {
                                id
                                user_name
                            }
                        }
                    }
                `,
                variables: {
                    user: {
                        user_name: 'updatedUser',
                        password: 'updatedPassword',
                    },
                },
            });

        expect(response.body.data.updateUser.user.user_name).toBe('updatedUser');
    });

    it('should delete a user', async () => {
        const response = await request(client)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation {
                        deleteUser {
                            message
                            user {
                                id
                                user_name
                            }
                        }
                    }
                `,
            });
        const userData = response.body.data.deleteUser;
        expect(userData).toHaveProperty("message");
        expect(userData).toHaveProperty("user");
    });
});