const router = require("express").Router();
const passport = require("passport");
const keys = require("../config/keys");

const CLIENT_HOME = keys.CLIENT_HOME_PAGE_URL;

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log("Starting Login Success ------------");
  console.log("--- REQ ---");
  console.log(Object.keys(req));
  console.log("--- REQ headers ---");
  console.log(req.headers);
  console.log("--- REQ _passport ---");
  console.log(req._passport);
  console.log("--- REQ user ---");
  console.log(req.user);
  if (req.user) {
    res.setHeader("Access-Control-Allow-Origin", CLIENT_HOME);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
    console.log("--- RES ---");
    console.log(Object.keys(res));
    console.log("--- RES _header ---");
    console.log(res._header);
    console.log("--- RES _headerSent ---");
    console.log(res._headerSent);
  } else {
    console.log("!!No User!!");
  }
  console.log("Ending Login Success ------------");
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME);
});


// auth with google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

// redirect to home page after successfully login via google
router.get('/google/logged', passport.authenticate('google', {
    successRedirect: CLIENT_HOME,
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
