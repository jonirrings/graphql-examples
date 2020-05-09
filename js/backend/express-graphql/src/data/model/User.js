import crypto from 'crypto';
import _pull from 'lodash/pull';

let id = 0;

function sha256(salt, pass) {
    const hash = crypto.createHash('sha256');
    hash.update(salt);
    hash.update(pass);
    return hash.digest('hex');
}

export default class User {
    constructor(name, pass, db) {
        this.t = 'u';
        this.name = name;
        this.salt = Math.random().toString(36).substring(2, 8);
        this.pass = sha256(this.salt, pass);
        this.posts = [];
        this.comments = [];
        this.id = (id++).toString(10);
        if (db.users) {
            db.users.push(this);
        } else {
            db.users = [this];
        }
    }

    match(pass) {
        return this.pass === sha256(this.salt, pass);
    }

    add_post(post_id) {
        this.posts.push(post_id);
    }

    rm_post(post_id) {
        _pull(this.posts, post_id)
    }

    add_comment(comment_id) {
        this.comments.push(comment_id);
    }

    rm_comment(comment_id) {
        _pull(this.comments, comment_id);
    }

    destroy(db) {
        const posts = db.posts.filter(post => this.posts.includes(post.id));
        const comments = db.comments.filter(comment => this.comments.includes(comment.id));
        comments.forEach(comment => {
            const post = db.posts.find(post => post.id === comment.post_id)
            if (post) _pull(post.comments, comment.id);
            comment._destroy(db);
        });
        posts.forEach(post => {
            const comments = db.comments.filter(comment => post.comments.includes(comment.id));
            comments.forEach(comment => {
                const user = db.users.find(user => user.id === comment.author_id);
                if (user) _pull(user.comments, comment.id);
                comment._destroy(db);
            })
        });
        this._destroy(db);
    }

    _destroy(db) {
        _pull(db.users, this);
    }
}
