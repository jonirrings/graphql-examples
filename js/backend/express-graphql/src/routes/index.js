import express from 'express';
import * as login from './login';
import * as register from './register';
import db from '../data/model';

const router = express.Router();

router.route('/login')
    .get(login.get)
    .post(login.post);
router.route('/register')
    .get(register.get)
    .post(register.post);
router.route('/logout')
    .all((req, res) => {
        const ck = req.cookies.id;
        const c = db.cookie(ck);
        if (c) c._destroy(db);
        res.clearCookie('id');
        res.send('logged out');
    });

export default router;
