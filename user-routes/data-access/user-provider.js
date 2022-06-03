import UserModel from '../model/user-model.js';

export default class UserProvider {
    constructor() {}

    async getAllUsers() {
        await UserModel.sync({ alter: true });
        return await UserModel.findAll();
    }

    async getUserByCondition(condition) {
        await UserModel.sync({ alter: true });
        return UserModel.findOne(condition);
    }

    async buildUser(description) {
        await UserModel.sync({ alter: true });
        const user = UserModel.build(description);
        await user.save();
    }

    async deleteUser(id) {
        await UserModel.sync({ alter: true });
        const user = UserModel.findAll({ where: { id } });
        await user.destroy();
    }
}
