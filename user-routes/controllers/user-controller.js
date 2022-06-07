import express from 'express';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import UserService from '../servises/user-service.js';
import UserProvider from '../data-access/user-provider.js';
import { verifyToken } from '../../login-routes/services/verifytoken.js';

const userService = new UserService(new UserProvider());
const userRouter = express.Router();
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

userRouter.get('/user', (req, res) => {
    res.status(404).send('UserId is required!');
});
userRouter.get('/user/:id', verifyToken, async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.id);
        res.status(404).send(error.stack);
    }
});
userRouter.delete('/user/:id', verifyToken, (req, res) => {
    try {
        userService.deleteUser(req.params.id);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.id);
        res.status(404).send(error.stack);
    }
});
userRouter.post('/user', verifyToken, validator.body(schema), (req, res) => {
    try {
        const uuid = userService.createUser(req.body);

        res.status(200).json(uuid);
    } catch (error) {
        console.log(error.stack, 'params: ', req.body);
        res.status(404).send(error.stack);
    }
});
userRouter.put('/user', verifyToken, (req, res) => {
    try {
        userService.updateUser(req.body);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.body);
        res.status(404).send(error.stack);
    }
});
userRouter.get('/user/suggestions/:suggestion', verifyToken, async (req, res) => {
    try {
        userService
            .getSuggestionsList(req.params.suggestion)
            .then(list => res.status(200).json(list))
            .catch(err => {
                throw err;
            });
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.suggestion);
        res.status(404).send(error.stack);
    }
});

export default userRouter;
