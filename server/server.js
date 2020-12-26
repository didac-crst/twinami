// require("dotenv/config");
const path = require('path');
const express = require('express');
//const session = require("express-session");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const _ = require('lodash');

const passportSetup = require("./config/passport-setup"); //Need it
const keys = require("./config/keys");
// const apiRoutes = require('./routes/api-routes');
const authRoutes = require('./routes/auth-routes');
//const User = require("./models/user-model");
const Article = require("./models/article-model");

// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const findOrCreate = require("mongoose-findorcreate");

// const Schema = mongoose.Schema;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
mongoose.connect(keys.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  console.log('Connected to MongoDB')
});


app.use(cookieSession({
  name: "session",
  keys: [keys.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 100 // session will expire after 24 hours
}));

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client

const corsConfig = {
    origin: keys.CLIENT_HOME_PAGE_URL,
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

app.use(cors(corsConfig));


// set up routes
// app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/auth", authCheck, (req, res) => {
  // res.header("Access-Control-Allow-Origin", keys.CLIENT_HOME_PAGE_URL);
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});


// GET --------------------------------------------------------

const staticContent = require("./public/content/json-content");


app.get('/image/:imageName', (req,res) =>{
  //your object
  const filePath = __dirname + '/public/images/' + req.params.imageName;
  res.sendFile(filePath);
});

app.get('/content/:page', (req, res) => {
  function createPackage(content,lang,route){
    // Deconstracting Object
    const {[lang]: langPack} = content;
    const mergedPack = _.merge(langPack, content.Files)
    const {[route]: newContent} = mergedPack;
    return newContent;
  }

  const input = req.params.page.split(':');
  const routeName = input[0];
  const langName = input[1];
  const contentFiltered = createPackage(staticContent,langName,routeName);
  res.send(contentFiltered);
});

app.get('/db', (req, res) => {
  Article.find(function(err, foundArticles){
    if(!err){
      const dbFiltered = {
        "articlesDB": foundArticles
      }
      res.send(dbFiltered);
    } else {
      res.send(err);
    }
  });
});

// app.get('/bookArticle/:articleID', (req,res) => {
//   const params = req.params.articleID.split(':');
//   const lang = params[0];
//   const artID = params[1];
//   Article.findOne({_id:artID}, function(err,foundArticle){
//     if(foundArticle){
//       res.send(foundArticle);
//     } else {
//       res.send("No article found");
//     }
//   });
// });

app.get('/myItems', (req,res) => {
  const userId = req.user._id;
  Article.find({userId:userId}, function(err,foundArticles){
    if(!err){
      const myItems = {
        "myItems": foundArticles
      }
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

// POST --------------------------------------------------------

app.post('/bookArticle', (req,res) => {
  const articleID = req.body.articleID;
  const booking = {
    booked: true,
    userId: req.user._id,
    userComment: req.body.comment
  };
  Article.updateOne(
    {_id: articleID},
    {$set: booking},
    function(err){
      if(!err){
        console.log("Succesfully booked article");
      } else {
        console.log(err);
      }
    }
  );
});

app.post('/deleteArticle', (req,res) => {
  const articleID = req.body.articleID;
  const booking = {
    booked: false,
    userId: "",
    userComment: ""
  };
  Article.updateOne(
    {_id: articleID},
    {$set: booking},
    function(err){
      if(!err){
        console.log("Succesfully unbooked article");
      } else {
        console.log(err);
      }
    }
  );
});

// PORT LISTENING ----------------------------------------


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port "+port);
});
