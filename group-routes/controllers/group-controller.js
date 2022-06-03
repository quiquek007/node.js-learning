import express from 'express';
import { verifyToken } from '../../login-routes/services/verifytoken.js';
import GroupProvider from '../data-access/group-provider.js';
import GroupService from '../services/group.service.js';

const groupRouter = express.Router();
const groupService = new GroupService(new GroupProvider());

groupRouter.get('/group/all', verifyToken, async (req, res) => {
    try {
        const group = await groupService.getAll();

        res.status(200).json(group);
    } catch (error) {
        console.log(error.stack);
        res.status(404).send(error.stack);
    }
});
groupRouter.get('/group/:id', verifyToken, async (req, res) => {
    try {
        const group = await groupService.getGroup(req.params.id);

        res.status(200).json(group);
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.id);
        res.status(404).send(error.stack);
    }
});
groupRouter.post('/group', verifyToken, async (req, res) => {
    try {
        const group = groupService.createGroup(req.body);

        res.status(200).json(group);
    } catch (error) {
        console.log(error.stack, 'params: ', req.body);
        res.status(404).send(error.stack);
    }
});
groupRouter.put('/group', verifyToken, (req, res) => {
    try {
        groupService.updateGroup(req.body);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.body);
        res.status(404).send(error.stack);
    }
});
groupRouter.delete('/group/:id', verifyToken, (req, res) => {
    try {
        groupService.deleteGroup(req.params.id);

        res.status(200).json('success');
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.id);
        res.status(404).send(error.stack);
    }
});
groupRouter.get('/group/suggestions/:suggestion', verifyToken, async (req, res) => {
    try {
        const list = await groupService.getSuggestionsList(req.params.suggestion);

        res.status(200).json(list);
    } catch (error) {
        console.log(error.stack, 'params: ', req.params.suggestion);
        res.status(404).send(error.stack);
    }
});

export default groupRouter;
