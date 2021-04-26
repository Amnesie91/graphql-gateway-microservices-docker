import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { context } from "./context";

const app = express();

const server = new ApolloServer({ schema, context, mocks: true });
server.applyMiddleware({ app });

export { app };
