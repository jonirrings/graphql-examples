import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import Post from './post';
import User from './user';
import {NodeInterface} from "./relay-types";

const Comment = new GraphQLObjectType({
    name: 'Comment',
    description: 'a typical comment on a post by a user',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'the id of a comment',
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the content of a comment',
        },
        post: {
            type: new GraphQLNonNull(Post),
            description: 'the post commented on',
            resolve(comment, args, ctx) {
                const db = ctx.db;
                return db.post(comment.post_id);
            }
        },
        author: {
            type: new GraphQLNonNull(User),
            description: 'the user who commented',
            resolve(comment, args, ctx) {
                const db = ctx.db;
                return db.user(comment.author_id);
            }
        }
    }),
    interfaces: () => [NodeInterface]
})

export default Comment;
