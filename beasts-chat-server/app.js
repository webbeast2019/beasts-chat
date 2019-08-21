const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000; 

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

http.listen(PORT, function(){
    console.log(`listening on port :${PORT}`);
  });

module.exports = app;
