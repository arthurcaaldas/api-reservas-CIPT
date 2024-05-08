require('dotenv').config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.API_PORT;
import corsOptions from './cors';

import auth from './app/controllers/auth.controller';
import reservations from './app/controllers/reservations.controller';
import rooms from './app/controllers/rooms.controller';
import users from './app/controllers/users.controller';

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/reservations', reservations);
app.use('/rooms', rooms);
app.use('/users', users);

app.listen(port, () => console.log(`⚡ [Server]: Server is running at http://localhost:${port}`))