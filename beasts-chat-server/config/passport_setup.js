const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user,done)=> {
    done(null,user.id)
});

passport.deserializeUser((id,done)=> {
    User.findById(id).then(user=>{
        done(null,user)
    })
});


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.find({googleId: profile.id}).then(user => {
            if (user) {
                console.log(`found user: ${user}`);
                done(null, user)
            }
            else {
                new User({
                    googleId: profile.id,
                    name:profile.displayName,
                    picture:profile._json.picture
                }).save().then(userCreated => {
                    console.log(`new user created ${userCreated} `);
                    done(null, userCreated)
                }).catch(err => console.log(err))
            }
        });
    })
);
