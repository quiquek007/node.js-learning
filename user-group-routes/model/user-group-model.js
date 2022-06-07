import { DataTypes } from 'sequelize';

export default {
    // Model attributes are defined here
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groupId: {
        type: DataTypes.STRING,
        allowNull: false
    }
};
