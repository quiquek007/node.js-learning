import { DataTypes } from 'sequelize';
import SequelizeConnection from '../../sequelize-connection.js';

export default new SequelizeConnection().define('UserGroups', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groupId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
