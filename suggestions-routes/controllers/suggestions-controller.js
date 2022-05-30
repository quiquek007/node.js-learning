import express from 'express';
import UserProvider from '../../user-routes/data-access/user-provider.js';
import SuggestionsService from '../services/suggestions.service.js';

const suggestionsRouter = express.Router();

suggestionsRouter.get('/suggestions/:suggestion', async (req, res) => {
    const list = await new SuggestionsService(new UserProvider()).getSuggestionsList(req.params.suggestion);

    res.status(200).json(list);
});

export default suggestionsRouter;
