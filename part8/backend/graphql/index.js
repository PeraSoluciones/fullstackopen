const { makeExecutableSchema } = require('@graphql-tools/schema');
const merge = require('lodash.merge');

// Importar typeDefs y resolvers de cada módulo
const authorTypeDefs = require('./author/author.typeDefs');
const authorResolvers = require('./author/author.resolvers');
const bookTypeDefs = require('./book/book.typeDefs');
const bookResolvers = require('./book/book.resolvers');
const authTypeDefs = require('./auth/auth.typeDefs');
const authResolvers = require('./auth/auth.resolvers');

// Definir un esquema base para poder extender Query y Mutation
const baseTypeDefs = `
  type Query
  type Mutation
  type Subscription
`;

// El array de typeDefs se mantiene igual
const typeDefs = [baseTypeDefs, authorTypeDefs, bookTypeDefs, authTypeDefs];

// Fusionamos los resolvers en un solo objeto
const resolvers = merge({}, authorResolvers, bookResolvers, authResolvers);

// Creamos el esquema ejecutable y lo exportamos
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
