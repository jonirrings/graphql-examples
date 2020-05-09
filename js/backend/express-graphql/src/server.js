import express from 'express';
import expressGraphql from 'express-graphql';
import cookieParser from 'cookie-parser';

import schema from './data/schema';
import db from './data/model';
import routes from './routes';
import badAuth from './middleware/auth';

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(badAuth());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', {title: 'Hey', message: 'Hello there!'}));

app.use(routes);

app.use('/graphql', expressGraphql((req, _res, _param) => ({
    schema,
    context: {db, user: req.user},
    graphiql: true,
    pretty: true,
})));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
