import SequelizeConnection from '../../sequelize-connection.js';
import userGroupModel from '../model/user-group-model.js';

export default class UserGroupService {
    constructor(provider) {
        this.provider = provider;
    }

    async addUsersToGroup(groupId, userIds) {
        await userGroupModel.sync({ alter: true });
        const t = await new SequelizeConnection().transaction();

        try {
            for (let index = 0; index < userIds.length; index++) {
                await userGroupModel.create(
                    {
                        userId: userIds[index],
                        groupId
                    },
                    { transaction: t }
                );
            }

            await t.commit();
        } catch (error) {
            console.error('error', error);
            await t.rollback();
        }
    }
}
