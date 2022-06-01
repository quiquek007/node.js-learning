import Sequelize from 'sequelize';
import crypto from 'crypto';
import SequelizeConnection from '../../sequelize-connection.js';
import userGroupModel from '../../user-group-routes/model/user-group-model.js';

const { Op } = Sequelize;

export default class GroupService {
    constructor(provider) {
        this.provider = provider;
    }

    async getGroup(id) {
        const group = await this.provider.getGroup({
            where: {
                [Op.or]: [{ id: { [Op.like]: `%${id}%` } }, { name: { [Op.like]: `%${id}%` } }]
            }
        });
        return group;
    }

    async updateGroup(req) {
        const group = await this.provider.getGroup({
            where: { id: req.id }
        });
        await group.update({ ...req });
        await group.save();
    }

    async deleteGroup(id) {
        const t = await new SequelizeConnection().transaction();
        await userGroupModel.sync({ alter: true });

        try {
            await this.provider.deleteGroup({ where: { id } });
            await userGroupModel.destroy({ where: { groupId: id } });
            await t.commit();
        } catch (error) {
            console.error('error', error);
            await t.rollback();
        }
    }

    createGroup(req) {
        const uuid = crypto.randomUUID();

        this.provider.buildGroup({
            id: uuid,
            name: req.name,
            permissions: req.permissions
        });

        return uuid;
    }

    async getSuggestionsList(phrase) {
        const limit = 3;
        const data = await this.provider.getAllGroups({
            where: {
                [Op.or]: [{ id: { [Op.like]: `%${phrase}%` } }, { name: { [Op.like]: `%${phrase}%` } }]
            },
            limit
        });

        return data;
    }

    async getAll() {
        const data = await this.provider.getAllGroups({});

        return data;
    }
}
