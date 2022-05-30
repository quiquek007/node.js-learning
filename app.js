import express from 'express';
import SequelizeConnection from './sequelize-connection.js';
import suggestionsRouter from './suggestions-routes/controllers/suggestions-controller.js';
import userRouter from './user-routes/controllers/user-controller.js';

// DB connection
new SequelizeConnection();

const app = express();
// eslint-disable-next-line no-undef
const port = Number(process.env.PORT) || 4200;

app.use(express.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect running front-end application on port 3000
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    res.set('Cache-Control', 'no-store');
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use('/', userRouter);
app.use('/', suggestionsRouter);

// DRAFT
// import postgresql from 'pg';
// const { Client } = postgresql;
// const client = new Client({
//     user: 'postgres',
//     database: 'node.js-learning',
//     password: 'admin',
//     port: 5432
// });
// client.connect();

// client.query(dataSql, (err, res) => {
//     console.log(err, res);
//     client.end();
// });
