import {GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql";
import Comment from "./comment";
import Post from "./post";
import User from "./user";
import {NodeInterface} from "./relay-types";

const NodeTypes = ['user', 'post', 'comment'];

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'required root field of a graphql schema',
    fields: {
        user: {
            type: User,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'the id to query a user',
                },
            },
            resolve(_, args, ctx) {
                const db = ctx.db;
                const id = args.id;
                return db.user(id);
            }
        },
        post: {
            type: Post,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'the id to query a post',
                },
            },
            resolve(_, args, ctx) {
                const db = ctx.db;
                const id = args.id;
                return db.post(id);
            }
        },
        comment: {
            type: User,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'the id to query a comment',
                },
            },
            resolve(_, args, ctx) {
                const db = ctx.db;
                const id = args.id;
                return db.comment(id);
            }
        },
        users: {
            type: new GraphQLNonNull(new GraphQLList(User)),
            description: 'all users',
            resolve(_, args, ctx) {
                const db = ctx.db;
                return db.users;
            }
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(Post)),
            description: 'all posts',
            resolve(_, args, ctx) {
                const db = ctx.db;
                return db.posts;
            }
        },
        comments: {
            type: new GraphQLNonNull(new GraphQLList(Comment)),
            description: 'all comments',
            resolve(_, args, ctx) {
                const db = ctx.db;
                return db.comments;
            }
        },
        node: {
            type: NodeInterface,
            description: 'the interface to query any type',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'a composite id, `type_id`, ex: `user_1`'
                }
            },
            resolve(_, args, ctx) {
                const [t, id] = args.id.split('_');
                const db = ctx.db;
                if (NodeTypes.includes(t)) {
                    return db[t](id);
                } else {
                    return new GraphQLError(`type must be one of ${NodeTypes.join(', ')}!`)
                }
            }
        }
    }
})

export default Query;
