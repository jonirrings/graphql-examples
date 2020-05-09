import {v4 as uuidV4} from 'uuid'
import db from '../data/model';
import Cookie from '../data/model/Cookie';
import User from '../data/model/User';

export function get(req, res) {
    res.render('register', {title: 'Register'})
}

export function post(req, res) {
    const {name, pass} = req.body;
    const user = new User(name, pass, db);
    const u = uuidV4();
    new Cookie(u, user.id, db);
    const message = `Register succeed, your id is ${user.id}`;
    res.cookie('id', u).render('register', {title: 'Register', message});
}
