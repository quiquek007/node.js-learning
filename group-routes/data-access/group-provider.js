import SequelizeConnection from '../../sequelize-connection.js';
import GroupModel from '../model/group-model.js';

export default class GroupProvider {
    constructor() {
        this.groupModel = new SequelizeConnection().define('Groups', GroupModel);
    }

    async getGroup(condition) {
        await this.groupModel.sync({ alter: true });
        return await this.groupModel.findOne(condition);
    }

    async buildGroup(description) {
        await this.groupModel.sync({ alter: true });
        const group = this.groupModel.build(description);
        await group.save();
    }

    async getAllGroups(condition) {
        await this.groupModel.sync({ alter: true });
        return await this.groupModel.findAll(condition);
    }

    async deleteGroup(condition) {
        await this.groupModel.sync({ alter: true });
        return await this.groupModel.destroy(condition);
    }
}
