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
    try {
        const user = await userService.getUser(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.id);
        res.status(404).send(error.stack);
    }
});
router.delete('/user/:id', (req, res) => {
    try {
        userService.deleteUser(req.params.id);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.id);
        res.status(404).send(error.stack);
    }
});
router.post('/user', validator.body(schema), (req, res) => {
    try {
        const uuid = userService.createUser(req.body);

        res.status(200).json(uuid);
    } catch (error) {
        console.log(error.stack, 'params: ', req.body);
        res.status(404).send(error.stack);
    }
});
router.put('/user', (req, res) => {
    try {
        userService.updateUser(req.body);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.body);
        res.status(404).send(error.stack);
    }
});
router.get('/user/suggestions/:suggestion', async (req, res) => {
    try {
        const list = await userService.getSuggestionsList(req.params.suggestion);

        res.status(200).json(list);
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.suggestion);
        res.status(404).send(error.stack);
    }
});

export default router;
