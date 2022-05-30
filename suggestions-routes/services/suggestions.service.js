import getAutoSuggestUsers from '../../utils/suggest-fn.js';

export default class SuggestionsService {
    constructor(provider) {
        this.provider = provider;
    }

    async getSuggestionsList(suggestion) {
        const limit = 3;
        const data = await this.provider.getAllUsers();

        return (
            getAutoSuggestUsers.call(
                data.map(e => e.dataValues),
                suggestion,
                limit
            ) || []
        );
    }
}
