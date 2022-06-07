import SequelizeConnection from '../../sequelize-connection.js';
import UserModel from '../model/user-model.js';

export default class UserProvider {
    constructor() {
        this.userModel = new SequelizeConnection().define('Users', UserModel);
    }

    async getAllUsers() {
        await this.userModel.sync({ alter: true });
        return await this.userModel.findAll();
    }

    async getUserByCondition(condition) {
        await this.userModel.sync({ alter: true });
        return this.userModel.findOne(condition);
    }

    async buildUser(description) {
        await this.userModel.sync({ alter: true });
        const user = this.userModel.build(description);
        await user.save();
    }

    async deleteUser(id) {
        await this.userModel.sync({ alter: true });
        const user = this.userModel.findAll({ where: { id } });
        await user.destroy();
    }
}
