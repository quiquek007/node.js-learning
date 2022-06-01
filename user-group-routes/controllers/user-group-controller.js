import express from 'express';
import UserGroupService from '../services/user-group-service.js';

const userGroupRouter = express.Router();
const userGroupService = new UserGroupService(null);

userGroupRouter.post('/user-group', async (req, res) => {
    await userGroupService.addUsersToGroup(req.body.groupId, req.body.userIds);

    res.status(200).json('success');
});

export default userGroupRouter;
