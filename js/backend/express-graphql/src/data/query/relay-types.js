import {GraphQLID, GraphQLInterfaceType, GraphQLNonNull} from 'graphql';
import Post from "./post";
import User from "./user";
import Comment from "./comment";

export const NodeInterface = new GraphQLInterfaceType({
    name: 'Node',
    description: 'a interface for all object with a ID field',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'id of an object',
        }
    },
    resolveType: (value) => {
        switch (value.t) {
            case "c":
                return Comment;
            case "p":
                return Post;
            case "u":
                return User;
            default:
                return null;
        }
    }
})
