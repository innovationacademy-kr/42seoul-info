require('dotenv').config();

var express = require('express');
var router = express.Router();

const passport = require('passport');
const FortyTwoStrategy = require('passport-42').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

passport.use(new FortyTwoStrategy({
  clientID: process.env.FORTYTWO_CLIENT_ID,
  clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
  callbackURL: process.env.RETURN_URL,
  passReqToCallback: true,
},
  function (req, accessToken, refreshToken, profile, cb) {
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;
    console.log('accessToken', accessToken, 'refreshToken', refreshToken);
    return cb(null, profile);
  }));
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '42Seoul Info', user: req.user });
});

router.get('/login/42',
  passport.authenticate('42')
);

router.get('/login/42/return',
  passport.authenticate('42', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
