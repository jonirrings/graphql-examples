import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import Post from './post';
import Comment from './comment';
import {NodeInterface} from "./relay-types";

const User = new GraphQLObjectType({
    name: 'User',
    description: 'A typical user',
    fields: () => ({ // we use a thunk for inter-dependence
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'ID of a user',
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'name of a user'
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(Post)),
            description: 'the posts of a user',
            resolve(user, args, ctx) {
                const db = ctx.db;
                return user.posts.map(post_id => db.post(post_id));
            }
        },
        comments: {
            type: new GraphQLNonNull(new GraphQLList(Comment)),
            description: 'the comments of a user',
            resolve(user, args, ctx) {
                const db = ctx.db;
                return user.comments.map(comment_id => db.comment(comment_id));
            }
        }
    }),
    interfaces: () => [NodeInterface]
});

export default User;
