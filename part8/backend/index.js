const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

require('dotenv').config();

mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime'],
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution'],
    },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
    type Author {
        name: String!
        bookCount: Int
        born: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }        

    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }    
`;

const resolvers = {
    Query: {
        bookCount: async () => await Book.collection.countDocuments(),
        authorCount: async () => await Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            // if (args.author) {
            //     return books.filter((b) => b.author === args.author);
            // } else if (args.genre) {
            //     return books.filter((b) => b.genres.includes(args.genre));
            // } else if (args.author && args.genre) {
            //     return books.filter(
            //         (b) =>
            //             b.author === args.author &&
            //             b.genres.includes(args.genre)
            //     );
            // } else return books;
            // if(args.author) return Book.find({ author: args.author });
            if (args.genre) {
                return Book.find({ genres: args.genre });
            } else return Book.find({});
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => context.currentUser,
    },
    Author: {
        bookCount: async (root) =>
            (await Book.find({ author: root._id })).length,
    },
    Book: {
        author: async (root) => await Author.findById(root.author),
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            try {
                if (!currentUser) {
                    throw new GraphQLError('Not authenticated', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                }

                let author = await Author.findOne({ name: args.author });
                if (!author) {
                    author = new Author({ name: args.author });
                    await author.save();
                }
                const book = new Book({ ...args, author: author._id });
                const savedBook = await book.save();

                return savedBook;
            } catch (error) {
                let message = error.message;

                throw new GraphQLError(
                    message.split(':')[2].replace('Path', 'Input'),
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: message.split(':')[1].trim(),
                            error,
                        },
                    }
                );
            }
        },
        editAuthor: async (root, args, { currentUser }) => {
            try {
                if (!currentUser) {
                    throw new GraphQLError('Not authenticated', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                }

                const author = await Author.findOne({ name: args.name });
                author.born = args.setBornTo;
                return await author.save();
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
        },
        createUser: async (root, args) => {
            try {
                const user = new User({ ...args });
                return await user.save();
            } catch (error) {
                let message = error.message;
                throw new GraphQLError(
                    message.split(':')[2].replace('Path', 'Input'),
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: message.split(':')[1].trim(),
                            error,
                        },
                    }
                );
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
            const userForToken = { username: user.username, id: user._id };
            const token = jwt.sign(userForToken, process.env.JWT_SECRET);
            return { value: token };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            );
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
