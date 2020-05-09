import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import User from './user';
import Comment from './comment';
import {NodeInterface} from "./relay-types";


const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'a typical post',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'the id of a post',
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the title of a post',
        },
        content: {
            type: GraphQLString,
            description: 'the content of a post',
        },
        authors: {
            type: new GraphQLNonNull(new GraphQLList(User)),
            description: 'the authors of a post',
            resolve(post, args, ctx) {
                const db = ctx.db;
                return post.authors.map(author_id => db.user(author_id));
            }
        },
        comments: {
            type: new GraphQLNonNull(new GraphQLList(Comment)),
            description: 'the comments of a post',
            resolve(post, args, ctx) {
                const db = ctx.db;
                return post.comments.map(comment_id => db.comment(comment_id));
            }
        }
    }),
    interfaces: () => [NodeInterface]
})

export default Post;
