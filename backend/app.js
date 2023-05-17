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

const fileUpload = require('express-fileupload');
// USE V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// routers
const router = express.Router();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const jobRouter = require('./routes/jobs');
const trendRouter = require('./routes/trends');
const eventRouter = require('./routes/events');
const conversationRouter = require('./routes/conversations');
const messageRouter = require('./routes/messages');
const commentRouter = require("./routes/comment");
const emailRouter = require('./routes/email');
const applicationRouter = require("./routes/applications");

app.use(fileUpload({ useTempFiles: true }));

//authentication
const authenticateUser = require('./middleware/authentication');

//database
const connectDB = require('./db/connect');
const mongoose = require("mongoose");

// routes
app.get('/', (req, res) => {
  res.send('<h1>Connected to the backend</h1>');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authenticateUser, userRouter);
app.use('/api/v1/post', authenticateUser, postRouter);
app.use('/api/v1/job', authenticateUser, jobRouter);
app.use('/api/v1/trend', authenticateUser, trendRouter);
app.use('/api/v1/event', authenticateUser, eventRouter);
app.use('/api/v1/conv', authenticateUser, conversationRouter);
app.use('/api/v1/message', authenticateUser, messageRouter);
app.use("/api/v1/comment", authenticateUser, commentRouter);
app.use('/api/v1/email', emailRouter);
app.use("/api/v1/application", authenticateUser, applicationRouter);

//process.env.PORT
const port = 8080;
  
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
