import crypto from 'crypto';
import getAutoSuggestUsers from '../../utils/suggest-fn.js';

export default class UserService {
    constructor(provider) {
        this.provider = provider;
    }

    async getUser(id) {
        const all = await this.provider.getAllUsers();
        const user = all.find(({ dataValues: u }) => !u.isDeleted && (u.id === id || u.login === id));

        return user.dataValues;
    }

    createUser(req) {
        const uuid = crypto.randomUUID();

        this.provider.buildUser({
            id: uuid,
            login: req.login,
            password: req.password,
            age: req.age,
            isDeleted: false
        });

        return uuid;
    }

    async deleteUser(id) {
        const [user] = await this.provider.getUserById(id);
        const updatedUser = { ...user.dataValues, isDeleted: true };
        delete updatedUser.apdatedAt;
        delete updatedUser.createdAt;
        this.updateUser(updatedUser);
    }

    async updateUser(req) {
        const [user] = await this.provider.getUserById(req.id);
        await user.update({ ...req });
        await user.save();
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
