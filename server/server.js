const express = require('express');
const db = require('./config/connection');
const { ApolloServer, authMiddleware } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async() => {
  //create a new Apollo server and pass in the schema data
  const server = new ApolloServer({
    typeDefs, resolvers, context: authMiddleware
  });

  //start Apollo server
  await server.start();
  
  //apply express.js middleware 
  server.applyMiddleware({ app });

  //log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
