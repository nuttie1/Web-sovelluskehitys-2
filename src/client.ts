import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import resolvers from './api/resolvers/index';
import typeDefs from './api/schemas/index';
import {expressMiddleware} from '@apollo/server/express4';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {applyMiddleware} from 'graphql-middleware';
import { MyContext } from './types/MyContext';
import {ApolloServer} from '@apollo/server';
import authenticate from './functions/authenticate';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
  } from '@apollo/server/plugin/landingPage/default';
import { notFound, errorHandler } from './middlewares';
require('dotenv').config();

const client = express();

client.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
    })
);

client.use(express.static('./build'));

(async () => {
    try {
        const schema = applyMiddleware(
            makeExecutableSchema({
                typeDefs,
                resolvers,
            }),
        );

        const server = new ApolloServer<MyContext>({
            schema,
            introspection: true, // Disable this in production, used to query the schema
            plugins: [
                process.env.NODE_ENV === 'production'
                    ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
                    : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
            ],
            includeStacktraceInErrorResponses: false,
        });
        await server.start();

        client.use(
            "/graphql",
            cors<cors.CorsRequest>(),
            express.json(),
            expressMiddleware(server, {
                context: async ({req}) => authenticate(req),
              }),
        );

        client.use(notFound);
        client.use(errorHandler);
        } catch (error) {
            console.error('Error starting server', error);
            return new Error('Error starting server' + error);
        }
    })();

export default client;