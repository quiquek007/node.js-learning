import express from 'express';
import { verifyToken } from '../../login-routes/services/verifytoken.js';
import UserGroupService from '../services/user-group-service.js';

const userGroupRouter = express.Router();
const userGroupService = new UserGroupService(null);

userGroupRouter.post('/user-group', verifyToken, async (req, res) => {
    try {
        await userGroupService.addUsersToGroup(req.body.groupId, req.body.userIds);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.body.groupId, req.body.userIds);
        res.status(404).send(error.stack);
    }
});

export default userGroupRouter;
