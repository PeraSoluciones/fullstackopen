const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    Query: {
        me: (root, args, { currentUser }) => currentUser,
    },
    Mutation: {
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
