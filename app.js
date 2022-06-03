import cors from 'cors';
import express from 'express';
import winston from 'winston';
import SequelizeConnection from './sequelize-connection.js';
import userRouter from './user-routes/controllers/user-controller.js';
import groupRouter from './group-routes/controllers/group-controller.js';
import userGroupRouter from './user-group-routes/controllers/user-group-controller.js';
import loginRouter from './login-routes/controllers/login-controller.js';

// DB connection
new SequelizeConnection();

const app = express();
// eslint-disable-next-line no-undef
const port = Number(process.env.PORT) || 4200;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'warn'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/example.log'
        })
    ]
};
const logger = winston.createLogger(logConfiguration);

app.use(cors(corsOptions));
app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use((req, res, next) => {
    console.time('Execution time: ');
    res.on('finish', () => console.timeEnd('Execution time: '));
    next();
});

app.use('/', loginRouter);
app.use('/', userRouter);
app.use('/', groupRouter);
app.use('/', userGroupRouter);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
    next(); // calling next middleware function or handler
});

// eslint-disable-next-line no-undef
process.on('uncaughtException', err => {
    logger.error('There was an uncaught error', err);
    // eslint-disable-next-line no-undef
    process.exit(1); // mandatory (as per the Node.js docs)
});
