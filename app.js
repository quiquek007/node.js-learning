import express from 'express';
import crypto from 'crypto';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import getAutoSuggestUsers from './utils/suggest-fn.js';

const app = express();
// eslint-disable-next-line no-undef
const port = Number(process.env.PORT) || 4200;
const router = express.Router();
const userStorage = [];
const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .alphanum()
        .regex(/(?:\d)/)
        .regex(/[a-z]/i)
        .required(),
    age: Joi.number().min(4).max(130).required()
});
const validator = createValidator();

app.use(express.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect running front-end application on port 3000
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    res.set('Cache-Control', 'no-store');
    next();
});
router.get('/user', (req, res) => {
    res.status(404).json(null);
});
router.get('/user/:id', (req, res) => {
    const user = userStorage.find(u => !u.isDeleted && (u.id === req.params.id || u.login === req.params.id));

    if (!user) return res.status(404).json('fail');

    res.status(200).json(user);
});
router.delete('/user/:id', (req, res) => {
    const user = userStorage.find(u => u.id === req.params.id);

    if (!user) return res.status(404).json('fail');

    user.isDeleted = true;
    res.status(200).json('success');
});
router.get('/suggestions/:suggestion', (req, res) => {
    const limit = 3;
    const list = getAutoSuggestUsers.call(userStorage, req.params.suggestion, limit) || [];

    res.status(200).json(list);
});

router.post('/new-user', validator.body(schema), (req, res) => {
    const uuid = crypto.randomUUID();

    userStorage.push({
        id: uuid,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
    });

    res.status(200).json(uuid);
});

router.put('/update-user', (req, res) => {
    const userIdx = userStorage.findIndex(u => u.id === req.body.id);

    if (!~userIdx) return res.status(400).json('fail');

    userStorage[userIdx] = { ...req.body };
    res.status(200).json('success');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use('/', router);
