import { DataTypes } from 'sequelize';
import SequelizeConnection from '../../sequelize-connection.js';

export default new SequelizeConnection().define('Users', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true
    },
    login: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// await User.sync({ alter: true });
// await sequelize.drop();
// const user = User.build({ Name: 'Jane' });
// user.save();
