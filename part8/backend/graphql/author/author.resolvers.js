const Author = require('../../models/author');
const { GraphQLError } = require('graphql');

module.exports = {
    Query: {
        authorCount: async () => await Author.collection.countDocuments(),
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: async (root, args, context) => {
            return context.loaders.bookCount.load(root._id);
        },
    },
    Mutation: {
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
    },
};
