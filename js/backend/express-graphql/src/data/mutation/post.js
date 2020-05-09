import {
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString
} from "graphql";
import PostModel from '../model/Post';
import Post from '../query/post';

const PostInput = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        content: {
            type: GraphQLString,
        },
    }
});

export const createPost = {
    description: 'create a post',
    type: new GraphQLNonNull(Post),
    args: {
        newPost: {
            type: new GraphQLNonNull(PostInput)
        }
    },
    resolve(_, args, ctx) {
        const {newPost} = args;
        const {db, user} = ctx;
        if (!user) throw Error('please login!');
        const post = new PostModel(newPost.title, newPost.content, [user.id], db);
        user.add_post(post.id);
        return post;
    }
};
export const updatePost = {
    description: 'update a post',
    type: Post,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString,
        },
        content: {
            type: GraphQLString,
        },
    },
    resolve(_, args, ctx) {
        const {id, title, content} = args;
        const {db, user} = ctx;
        if (!user) throw Error('please login!');
        const post = db.post(id);
        if (post) {
            if (title) post.title = title;
            if (content) post.content = content;
            if (post.authors.indexOf(user.id) >= 0) post.authors.push(id)
            return post;
        }
        return null;
    }
}
export const deletePost = {
    description: 'delete a post by id',
    type: Post,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(_, args, ctx) {
        const {id} = args;
        const {db, user} = ctx;
        if (!user) throw Error('please login!');
        const post = db.post(id);
        if (post) {
            post.destroy();
            return post;
        }
        return null;
    }
}
