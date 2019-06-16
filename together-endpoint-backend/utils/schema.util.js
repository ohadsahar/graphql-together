const { makeAugmentedSchema } = require('neo4j-graphql-js');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const dir = require('node-dir');
const chalk = require('chalk');
const path = require('path');

const typesArray = fileLoader(path.join(__dirname, '../seed'), { recursive: true });
const typeDefs = mergeTypes(typesArray, { all: true });
const files = dir.files(path.join(__dirname, '../seed'), { sync: true });
console.log(chalk.green(`mergedSchema.util: started, found ${files.length} schema`));
const mergedSchema = makeAugmentedSchema({
  typeDefs,
  config: {
    query: false, // disable or enable default queries and mutations
    mutation: false,
  },
});


module.exports = mergedSchema;