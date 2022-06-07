import { DataTypes } from 'sequelize';

export default {
    // Model attributes are defined here
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
};
