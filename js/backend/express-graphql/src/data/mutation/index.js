import {GraphQLObjectType} from 'graphql';
import {createPost, updatePost, deletePost} from './post';
import {addCommentToPost, deleteComment} from './comment';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'optional root field of a graphql schema',
    fields: {
        createPost,
        updatePost,
        deletePost,
        addCommentToPost,
        deleteComment,
    }
});

export default Mutation;
