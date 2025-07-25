// Se exporta como un string de plantilla
module.exports = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  extend type Query {
    bookCount: Int
    allBooks(author: String, genre: String): [Book!]
  }

  extend type Subscription {
    bookAdded: Book!
  }

  extend type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
`;
