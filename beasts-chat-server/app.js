const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chat = require('./chat.service');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
chat(io); // connect chat service
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const passportSetup = require('./config/passport_setup');
const keys = require('./config/keys')

// connecting to db
const mongoose = require('mongoose');

mongoose.connect(keys.google.mongoAtlas.dbURI,{ useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);


module.exports = {app, server};
