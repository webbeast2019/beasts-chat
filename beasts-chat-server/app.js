const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chat = require('./chat.service');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
console.log(chat);
chat(io); // connect chat service

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = {app, server};
