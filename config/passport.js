let passport = require('passport');
let User = require('../backend/database/model/user/userModel');
let localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signUp', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
}, function (email, password, done) {
    User.findOne({ 'email': email, }, (err, user) => {
        if (err) {
            return done(err, false, { message: 'Error occur.' });
        }
        if (user) {
            return done(null, user, { message: 'Email is already in use.', saveUser: false });
        } else {
            if (email && password) {
                return done(null, false, { message: 'User details is valid', saveUser: true });
            } else {
                return done(null, false, { message: 'User details not found', saveUser: false });
            }
        }
    });
}));



passport.use('local.signIn', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
}, function (email, password, done) {
    User.findOne({ 'email': email, }, (err, user) => {
        if (err) {
            return done(err, false, { message: 'Error occur.' });
        }
        if (!user) {
            return done(null, false, { message: 'User not found.', userFound: false });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Password not matched', userFound: false });
        }
        return done(null, user, { message: 'User Login Successfully', userFound: true });
    });
}));


////For password encryption
 // let newUser = new User();
        // newUser.email = email;
        // newUser.password = newUser.encryptPassword(password);
        // newUser.save((err, result) => {
        //     if (err) {
        //         return done(err);
        //     } else {
        //         return done(null, newUser,{ message: 'New Id Created.' });
        //     }
        // });