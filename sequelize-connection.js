import 'dotenv/config';
import { Sequelize } from 'sequelize';

// eslint-disable-next-line no-undef
const { DB_NAME, DB_USER_NAME, DB_PASS, DB_HOST } = process.env;
let instance;
class SequelizeConnection {
    constructor() {
        if (!instance) {
            instance = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASS, {
                host: DB_HOST,
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
