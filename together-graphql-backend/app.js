const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { v1 } = require('neo4j-driver');
const chalk = require('chalk');
const config = require('./utils/config');
const mergedSchema = require('./utils/schema.util');
const ioServer = require('../together-endpoint-backend/server');
const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const app = express();
const driver = v1.driver(
  config[env].neoDB.uri,
  v1.auth.basic(
    config[env].neoDB.username, config[env].neoDB.password,
  ),
);

const isDev = process.env.NODE_ENV !== 'production';
ioServer.connect();
const server = new ApolloServer({
  schema: mergedSchema,
  context: ({ req }) => ({
    req,
    driver,
  }),
  introspection: true,
  playground: isDev,
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config[env].cors));
server.applyMiddleware({ app });
app.listen(PORT, () => {
 console.log(chalk.magenta(`App listening on http://localhost:${PORT}${server.graphqlPath}`));
});


module.exports = app;
