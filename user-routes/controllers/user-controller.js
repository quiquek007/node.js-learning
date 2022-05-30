import express from 'express';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import UserService from '../servises/user-service.js';
import UserProvider from '../data-access/user-provider.js';

const userService = new UserService(new UserProvider());
const router = express.Router();
const validator = createValidator();
const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .alphanum()
        .regex(/(?:\d)/)
        .regex(/[a-z]/i)
        .required(),
    age: Joi.number().min(4).max(130).required()
});

router.get('/user', (req, res) => {
    res.status(404).json(null);
});
router.get('/user/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);

    if (!user) return res.status(404).json('fail');

    res.status(200).json(user);
});
router.delete('/user/:id', (req, res) => {
    userService.deleteUser(req.params.id);

    res.status(200).json('success');
});
router.post('/user', validator.body(schema), (req, res) => {
    const uuid = userService.createUser(req.body);

    res.status(200).json(uuid);
});
router.put('/user', (req, res) => {
    userService.updateUser(req.body);

    res.status(200).json('success');
});

export default router;
