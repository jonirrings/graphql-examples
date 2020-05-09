import _pull from 'lodash/pull';

class Cookie {
    constructor(cookie, user_id, db) {
        this.cookie = cookie;
        this.user_id = user_id;
        if (db.cookies) {
            db.cookies.push(this);
        } else {
            db.cookies = [this];
        }
    }

    _destroy(db) {
        _pull(db.cookies, this);
    }
}

export default Cookie;
