const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require("./keys");
const User = require("../models/user-model");


// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// Strategies
passport.use(
  new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: keys.SERVER_HOME_PAGE_URL+"/auth/google/logged",
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    }, function(err, user) {
      return cb(err, user);
    });
  }

  // async (accessToken, refreshToken, profile, done) => {
  //     const existingUser = await User.findOne({ googleId: profile.id });
  //
  //     if (existingUser) {
  //         return done(null, existingUser);
  //     }
  //
  //     const user = await User({ googleID: profile.id }).save()
  //     done(null, user);
  // }

  )
);
