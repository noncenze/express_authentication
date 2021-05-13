const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// SETTING UP DATABASE
const db = require('../models');

// LOCALSTRATEGY INSTANCE
const STRATEGY = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, cb) => {                     // <------- Parameters (email, password, callback)
    try {
        const user = await db.user.findOne({
            where: {email}                              // {email} = {email: email} from the parameters above
        });
        if (!user || !user.validPassword(password)) {   // password is from the parameters above
            cb(null, false);
        } else {
            cb(null, user);
        }
    } catch (error) {
        console.log('----------- Error Below -----------');
        console.log(error);
    }
});

// PASSPORT "serialize" info to be able to login
passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

// DESERIALIZE USER TO RETURN USER IF FOUND BY ID
passport.deserializeUser(async (id, cb) => {
    try {
        const user = await db.user.findByPk(id);
        if (user) {
            cb(null, user);
        }
    } catch (error) {
        console.log('----------- Error Below -----------');
        console.log(error);
    }
});


passport.use(STRATEGY);                                 // passport.use => has its own Middleware

module.exports = passport;