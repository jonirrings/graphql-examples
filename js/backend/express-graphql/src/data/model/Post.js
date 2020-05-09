import _pull from 'lodash/pull';

let id = 0;
export default class Post {
    constructor(title, content, users, db) {
        this.t = 'p';
        this.title = title;
        this.content = content;
        this.authors = users;
        this.comments = [];
        this.id = (id++).toString(10);
        if (db.posts) {
            db.posts.push(this);
        } else {
            db.posts = [this];
        }
    }

    add_comment(comment_id) {
        this.comments.push(comment_id);
    }

    rm_comment(comment_id) {
        _pull(this.comments, comment_id);
    }

    destroy(db) {
        const users = db.users.filter(user => this.authors.includes(user.id));
        const comments = db.comments.filter(comment => this.comments.includes(comment.id));
        users.forEach(user => _pull(user.posts, this.id));
        comments.forEach(comment => {
            const user = db.users.find(user => user.id === comment.author_id);
            if (user) _pull(user.comments, comment.id);
            comment._destroy(db);
        });
        this._destroy(db);
    }

    _destroy(db) {
        _pull(db.posts, this);
    }
}
