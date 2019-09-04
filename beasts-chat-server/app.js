const http = require('http');
const express = require('express');
const path = require('path');
const cookieSession  = require('cookie-session');
const logger = require('morgan');
const chat = require('./chat.service');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
chat(io); // connect chat service
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const passport = require('passport');
const passportSetup = require('./config/passport_setup');
const keys = require('./config/keys');

// connecting to db
const mongoose = require('mongoose');

mongoose.connect(keys.google.mongoAtlas.dbURI,{ useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', profileRouter);
app.use('/auth', authRouter);

module.exports = {app, server};
