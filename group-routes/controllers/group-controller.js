import express from 'express';
import GroupProvider from '../data-access/group-provider.js';
import GroupService from '../services/group.service.js';

const groupRouter = express.Router();
const groupService = new GroupService(new GroupProvider());

groupRouter.get('/group/all', async (req, res) => {
    const group = await groupService.getAll();

    res.status(200).json(group);
});
groupRouter.get('/group/:id', async (req, res) => {
    const group = await groupService.getGroup(req.params.id);

    if (!group) return res.status(404).json('fail');

    res.status(200).json(group);
});
groupRouter.post('/group', async (req, res) => {
    const group = groupService.createGroup(req.body);

    res.status(200).json(group);
});
groupRouter.put('/group', (req, res) => {
    groupService.updateGroup(req.body);

    res.status(200).json('success');
});
groupRouter.delete('/group/:id', (req, res) => {
    groupService.deleteGroup(req.params.id);

    res.status(200).json('success');
});
groupRouter.get('/group/suggestions/:suggestion', async (req, res) => {
    const list = await groupService.getSuggestionsList(req.params.suggestion);

    res.status(200).json(list);
});

export default groupRouter;
