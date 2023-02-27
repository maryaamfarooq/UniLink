require('dotenv').config();
require('express-async-errors');
const path = require("path");

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')


const express = require('express');
const app = express();

app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.static('./public'));
app.use(express.json());

// routers
const router = express.Router();
const authRouter = require('./routes/auth');

// routes
app.get('/', (req, res) => {
  res.send('<h1>Connected to the backend</h1>');
});

//database
const connectDB = require('./db/connect');
const mongoose = require("mongoose");

app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB('mongodb+srv://ajwadmasood:Mongodb-1@cluster0.qvm7utq.mongodb.net/UniLink?retryWrites=true&w=majority');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();