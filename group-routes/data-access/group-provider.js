import GroupModel from '../model/group-model.js';

export default class GroupProvider {
    constructor() {}

    async getGroup(condition) {
        await GroupModel.sync({ alter: true });
        return await GroupModel.findOne(condition);
    }

    async buildGroup(description) {
        await GroupModel.sync({ alter: true });
        const group = GroupModel.build(description);
        await group.save();
    }

    async getAllGroups(condition) {
        await GroupModel.sync({ alter: true });
        return await GroupModel.findAll(condition);
    }

    async deleteGroup(condition) {
        await GroupModel.sync({ alter: true });
        return await GroupModel.destroy(condition);
    }
}
