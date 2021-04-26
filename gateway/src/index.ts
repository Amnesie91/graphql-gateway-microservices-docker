import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";

import express from "express";
const port = process.env.PORT || 3000;

const app = express();

const gateway = new ApolloGateway({
  serviceList: [{ name: "template", url: "http://template:3000" }],
  // thats how we get the information from the context, to the implementing services
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
    });
  },
  serviceHealthCheck: true,
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.applyMiddleware({ app });

const bootstrap = async () => {
  try {
    await app.listen({ port });
    console.log(
      `Gateway ready at http://localhost:${port}${server.graphqlPath} !!`
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
