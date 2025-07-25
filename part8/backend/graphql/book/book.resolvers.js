const Book = require('../../models/book');
const Author = require('../../models/author');
const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubSub = new PubSub();

module.exports = {
    Query: {
        bookCount: async () => await Book.collection.countDocuments(),
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
                return Book.find({
                    genres: { $in: [args.genre] },
                });
            } else return Book.find({});
        },
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

                pubSub.publish('BOOK_ADDED', { bookAdded: savedBook });

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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubSub.asyncIterableIterator('BOOK_ADDED'),
        },
    },
};
