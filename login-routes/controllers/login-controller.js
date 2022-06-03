import express from 'express';
import UserProvider from '../../user-routes/data-access/user-provider.js';
import LoginService from '../services/login-service.js';

const loginRouter = express.Router();
const loginService = new LoginService(new UserProvider());

loginRouter.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await loginService.login(login, password);

        res.status(200).json(user);
    } catch (error) {
        console.log(error.stack, 'params: ', req.body.login, req.body.password);
        res.status(404).send(error.stack);
    }
});

export default loginRouter;
