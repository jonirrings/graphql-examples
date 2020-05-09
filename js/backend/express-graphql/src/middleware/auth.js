import db from '../data/model';

export default function () {
    return function (req, res, next) {
        const ck = req.cookies.id;
        if (ck) {
            const c = db.cookie(ck);
            if (c) {
                const user = db.user(c.user_id);
                if (user) req.user = user;
            }
        }
        next();
    }
}
