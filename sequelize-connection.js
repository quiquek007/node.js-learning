import { Sequelize } from 'sequelize';

let instance;

class SequelizeConnection {
    constructor() {
        if (!instance) {
            instance = new Sequelize('node.js-learning', 'postgres', 'admin', {
                host: 'localhost',
                dialect: 'postgres'
            });
            this.init();
        }
        return instance;
    }

    async init() {
        try {
            await instance.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    getInstance() {
        return instance;
    }
}

export default SequelizeConnection;
