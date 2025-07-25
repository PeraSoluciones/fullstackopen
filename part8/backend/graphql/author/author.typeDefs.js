module.exports = `
  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  extend type Query {
    authorCount: Int
    allAuthors: [Author!]
  }

  extend type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;
