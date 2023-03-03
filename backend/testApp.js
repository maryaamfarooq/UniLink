require('dotenv').config();
require('express-async-errors');
const path = require("path");

const express = require('express');
const app = express();

// routes
const router = express.Router();
const authRouter = require('./routes/auth');
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB('mongodb+srv://ajwadmasood:Mongodb-1@cluster0.qvm7utq.mongodb.net/UniLink?retryWrites=true&w=majority');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
