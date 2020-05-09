import CommentModel from '../model/Comment';
import Comment from "../query/comment";
import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";

export const addCommentToPost = {
    description: 'add your comment to a post',
    type: Comment,
    args: {
        post_id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'the id of the post on which you will comment'
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the content of your comment'
        }
    },
    resolve(_, args, ctx) {
        const {post_id, content} = args;
        const {db, user} = ctx;
        if (!user) throw Error("please login");
        const post = db.post(post_id);
        if (!post) return null;
        const comment = new CommentModel(content, user.id, post_id, db);
        // you should use transactional db operation rather than this shit code
        post.add_comment(comment.id);
        user.add_comment(comment.id);
        return comment;
    }
}

export const deleteComment = {
    description: 'delete a comment by id',
    type: Comment,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'the id of the comment to delete'
        }
    },
    resolve(_, args, ctx) {
        const {id} = args;
        const {db, user} = ctx;
        if (!user) throw Error("please login");
        const comment = db.comment(id);
        if (comment.author_id !== user.id) throw Error("user not match");
        comment.destroy();
        return comment;
    }
}
