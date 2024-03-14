import client from '../client';
import request from 'supertest';
import { LoginResponse } from '../types/MessageTypes';
import { UserTest, csPlayerTest } from '../types/DBTypes';
import mongoose from 'mongoose';

/**
 * Tests for the user API
 */
describe('User API', () => {
    let token: string;

    let user: LoginResponse;

    const testUser: UserTest = {
        user_name: 'test' + Math.floor(Math.random() * 1000),
        password: 'test' + Math.floor(Math.random() * 1000),
    };

    /**
     * Test for registering a user
     * It sends a mutation to the /graphql endpoint
     */
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
        const userData = response.body.data.register;
        expect(response.body.data.register.user.user_name).toBe(testUser.user_name);
        expect(userData).toHaveProperty("user");
        expect(userData.user).toHaveProperty("id");
    });

    /**
     * Test for logging in a user
     * It sends a mutation to the /graphql endpoint
     */
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
        const userData = response.body.data.login;
        expect(response.body.data.login.user.user_name).toBe(testUser.user_name);
        expect(userData).toHaveProperty("token");
        expect(userData).toHaveProperty("user");
        expect(userData.user).toHaveProperty("id");
        user = response.body.data.login;
        console.log(user);
        token = response.body.data.login.token;
    });

    /**
     * Test for getting all users
     * It sends a query to the /graphql endpoint
     */
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

    /**
     * Test for getting a user by id
     * It sends a query to the /graphql endpoint
     */
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
        const userData = response.body.data.userById;
        expect(response.body.data.userById.user_name).toBe(testUser.user_name);
        expect(userData).toHaveProperty("user_name");
    });

    /**
     * Test for verifying user's password
     * It sends a query to the /graphql endpoint
     */
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

    /**
     * Test for updating a user
     * It sends a mutation to the /graphql endpoint
     */
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

    /**
     * Test for deleting a user
     * It sends a mutation to the /graphql endpoint
     */
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

/**
 * Tests for the csPlayer API
 */
describe('csPlayer API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URL as string);
      });
    
      afterAll(async () => {
        await mongoose.connection.close();
      });

    let player: csPlayerTest;

    const testPlayer: csPlayerTest = {
        name: 'test' + Math.floor(Math.random() * 1000),
        team: 'test' + Math.floor(Math.random() * 1000),
        country: 'finland' ,
        age: Math.floor(Math.random() * 100),
        role: 'rifler',
        total_winnings: Math.floor(Math.random() * 1000000),
    };

    /**
     * Test for creating a cs player
     * It sends a mutation to the /graphql endpoint
     */
    it('should create a cs player', async () => {
        try {
            console.log(testPlayer);
            const response = await request(client)
                .post('/graphql')
                .send({
                    query: `
                        mutation CreateCsPlayer($input: CsPlayerInput!) {
                            createCsPlayer(input: $input) {
                                id
                                name
                                team
                                country
                                age
                                role
                                total_winnings
                            }
                        }
                    `,
                    variables: {
                        input: testPlayer,
                    },
                });
            console.log(response.body);
            const playerData = response.body.data.createCsPlayer;
            if (!playerData) {
                throw new Error('createCsPlayer is null');
            }
            expect(response.body.data.createCsPlayer.name).toBe(testPlayer.name);
            expect(playerData).toHaveProperty("id");
            expect(playerData).toHaveProperty("name");
            expect(playerData).toHaveProperty("team");
            expect(playerData).toHaveProperty("country");
            expect(playerData).toHaveProperty("age");
            expect(playerData).toHaveProperty("role");
            expect(playerData).toHaveProperty("total_winnings");
            player = response.body.data.createCsPlayer;
        } catch (error) {
            console.error('Error connecting to server:', error);
        }
    });

    /**
     * Test for getting all cs players
     * It sends a query to the /graphql endpoint
     */
    it ('should get all cs players', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    query {
                        allCsPlayers {
                            id
                            name
                        }
                    }
                `,
            });
        const players = response.body.data.allCsPlayers;
        expect(players).toBeInstanceOf(Array);
        expect(players[0]).toHaveProperty('id');
        expect(players[0]).toHaveProperty('name');
    });

    /**
     * Test for getting a cs player by id
     * It sends a query to the /graphql endpoint
     */
    it ('should get a cs player by id', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    query GetCsPlayerById($id: ID!) {
                        getCsPlayerById(id: $id) {
                            id
                            name
                            team
                            country
                            age
                            role
                            total_winnings
                        }
                    }
                `,
                variables: {
                    id: player.id,
                },
            });
        const playerData = response.body.data.getCsPlayerById;
        expect(response.body.data.getCsPlayerById.name).toBe(testPlayer.name);
        expect(playerData).toHaveProperty("id");
        expect(playerData).toHaveProperty("name");
        expect(playerData).toHaveProperty("team");
        expect(playerData).toHaveProperty("country");
        expect(playerData).toHaveProperty("age");
        expect(playerData).toHaveProperty("role");
        expect(playerData).toHaveProperty("total_winnings");
    });

    /**
     * Test for getting a cs player by name
     * It sends a query to the /graphql endpoint
     */
    it ('should get a cs player by name', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    query GetCsPlayerByName($name: String!) {
                        getCsPlayerByName(name: $name) {
                            id
                            name
                            team
                            country
                            age
                            role
                            total_winnings
                        }
                    }
                `,
                variables: {
                    name: testPlayer.name,
                },
            });
        const playerData = response.body.data.getCsPlayerByName;
        expect(response.body.data.getCsPlayerByName.name).toBe(testPlayer.name);
        expect(playerData).toHaveProperty("id");
        expect(playerData).toHaveProperty("name");
        expect(playerData).toHaveProperty("team");
        expect(playerData).toHaveProperty("country");
        expect(playerData).toHaveProperty("age");
        expect(playerData).toHaveProperty("role");
        expect(playerData).toHaveProperty("total_winnings");
    });

    /**
     * Test for getting a random cs player
     * It sends a query to the /graphql endpoint
     */
    it ('should get a random cs player', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    query {
                        getRandomPlayer {
                            id
                            name
                            team
                            country
                            age
                            role
                            total_winnings
                        }
                    }
                `,
            });
        const playerData = response.body.data.getRandomPlayer;
        expect(playerData).toHaveProperty("id");
        expect(playerData).toHaveProperty("name");
        expect(playerData).toHaveProperty("team");
        expect(playerData).toHaveProperty("country");
        expect(playerData).toHaveProperty("age");
        expect(playerData).toHaveProperty("role");
        expect(playerData).toHaveProperty("total_winnings");
    });

    /**
     * Test for getting all player names
     * It sends a query to the /graphql endpoint
     */
    it ('should delete a cs player', async () => {
        const response = await request(client)
            .post('/graphql')
            .send({
                query: `
                    mutation DeleteCsPlayer($id: ID!) {
                        deleteCsPlayer(id: $id) {
                            id
                            name
                            team
                            country
                            age
                            role
                            total_winnings
                        }
                    }
                `,
                variables: {
                    id: player.id,
                },
            });
        const playerData = response.body.data.deleteCsPlayer;
        expect(playerData).toHaveProperty("id");
        expect(playerData).toHaveProperty("name");
        expect(playerData).toHaveProperty("team");
        expect(playerData).toHaveProperty("country");
        expect(playerData).toHaveProperty("age");
        expect(playerData).toHaveProperty("role");
        expect(playerData).toHaveProperty("total_winnings");
    });
});