import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { connect } from './config/db/index.js';
import siteRoute from './routes/site.js';
import blogRoute from './routes/blog.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

//routes
app.use('/', siteRoute);
app.use('/blog', blogRoute);

// server listen
connect();
app.listen(port, () => console.log(`Connection server: http://localhost:${port}`));


