// this is a low performance pseudo database for demo,
// use a real data-source in production
import faker from 'faker';
import _times from 'lodash/times';
import User from './User';
import Post from "./Post";
import Comment from "./Comment";

class Db {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.cookies = [];
    }

    user(id) {
        return this.users.find(user => user.id === id);
    }

    post(id) {
        return this.posts.find(post => post.id === id);
    }

    comment(id) {
        return this.comments.find(comment => comment.id === id);
    }

    cookie(ck) {
        return this.cookies.find(c => c.cookie = ck);
    }

    cookie2user(cookie) {
        const c = this.cookies.find(c => c.cookie = cookie);
        let user = null;
        if (c) user = this.user(c.user_id);
        return user;
    }
}

const db = new Db();
// populate fake data
_times(10, () => {
    const user = new User(faker.internet.userName(), '1234', db);
    const post = new Post(faker.lorem.word(), faker.lorem.sentence(), [user.id], db);
    user.add_post(post.id);
    _times(10, () => {
        const comment = new Comment(faker.lorem.words(10), user.id, post.id, db);
        post.add_comment(comment.id);
        user.add_comment(comment.id);
    })
})

export default db;
