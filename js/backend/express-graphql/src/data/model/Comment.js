import _pull from 'lodash/pull';

let id = 0;

class Comment {
    constructor(content, author_id, post_id, db) {
        this.t = 'c';
        this.content = content;
        this.author_id = author_id;
        this.post_id = post_id;
        this.id = (id++).toString(10);
        if (db.comments) {
            db.comments.push(this);
        } else {
            db.comments = [this];
        }
    }

    destroy(db) {
        const user = db.users.find(user => user.id === this.author_id);
        const post = db.posts.find(post => post.id === this.post_id);
        if (user) _pull(user.comments, this.id);
        if (post) _pull(post.comments, this.id);
        this._destroy(db);
    }

    _destroy(db) {
        _pull(db.comments, this);
    }
}

export default Comment;
