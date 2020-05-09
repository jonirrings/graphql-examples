import {v4 as uuidV4} from 'uuid';
import db from '../data/model';
import Cookie from '../data/model/Cookie';

export function get(req, res) {
    res.render('login', {title: 'Login'})
}

export function post(req, res) {
    const {id, pass} = req.body;
    const user = db.user(id);
    let match = false;
    if (user) match = user.match(pass);
    if (match) {
        const u = uuidV4();
        new Cookie(u, id, db);
        res.cookie('id', u).send('login success');
    } else {
        res.render('login', {title: 'Login', message: 'id or pass not match'});
    }
}
