// require("dotenv/config");
const path = require('path');
const express = require('express');
const session = require("express-session");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const _ = require('lodash');

const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
// const apiRoutes = require('./routes/api-routes');
const authRoutes = require('./routes/auth-routes');
const User = require("./models/user-model");
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

// Connecting to the database
mongoose.connect(keys.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  console.log('Connected to MongoDB')
});


// app.use(session({
//   secret: keys.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

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


// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", keys.CLIENT_HOME_PAGE_URL);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// set up routes
// app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({
//       authenticated: false,
//       message: "user has not been authenticated"
//     });
//   } else {
//     next();
//   }
// };
//
// // if it's already login, send the profile response,
// // otherwise, send a 401 response that the user is not authenticated
// // authCheck before navigating to home page
// app.get("/auth", authCheck, (req, res) => {
//   // res.header("Access-Control-Allow-Origin", keys.CLIENT_HOME_PAGE_URL);
//   res.status(200).json({
//     authenticated: true,
//     message: "user successfully authenticated",
//     user: req.user,
//     cookies: req.cookies
//   });
// });






// Define User Table
// const userSchema = new mongoose.Schema({
//   email: String,
//   googleId: String,
//   facebookId: String,
//   name: String,
// });

// add passport mongoose plugin to our object
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User", userSchema);

// use static authenticate method of model in LocalStrategy
// passport.use(User.createStrategy());

// // use static serialize and deserialize of model for passport session support
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:9000/auth/google/logged",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({
//       googleId: profile.id,
//       name: profile.displayName,
//       email: profile.emails[0].value
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));



// Import content:
// const pathContent = __dirname + '/public/content/';
// const staticContent = {
//   "Files": require(pathContent +'/contFiles.json'),
//   "metaEN": require(pathContent +'/contEN.json'),
//   "metaFR": require(pathContent +'/contFR.json'),
//   "metaES": require(pathContent +'/contES.json'),
//   "metaCA": require(pathContent +'/contCA.json'),
//   "metaDE": require(pathContent +'/contDE.json')
// }

const staticContent = require("./public/content/json-content");

// Define Schema
// const articleSchema = new Schema({
//   metaEn: {
//     name: String,
//     description: String
//   },
//   metaFr: {
//     name: String,
//     description: String
//   },
//   metaEs: {
//     name: String,
//     description: String
//   },
//   metaCa: {
//     name: String,
//     description: String
//   },
//   metaDe: {
//     name: String,
//     description: String
//   },
//   price: String,
//   quantity: String,
//   buyNew: Boolean,
//   link: String,
//   image: {
//     data: Buffer,
//     contentType: String
//   }
// });

// const Article = new mongoose.model('Article', articleSchema);


// function filterArticlesLang(articles,lang){
//   articlesMeta =[];
//   articles.forEach(article => {
//     const {[lang]: meta} = article;
//     const articleMeta = {meta};
//     articleMeta._id = article._id;
//     articlesMeta.push(articleMeta);
//   });
//   return articlesMeta;
// }


// GET --------------------------------------------------------


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

app.get('/db/:page', (req, res) => {
  const routeName = req.params.page;

  Article.find(function(err, foundArticles){
    if(!err){
      const dbFiltered = {
        // "articlesMeta": filterArticlesLang(foundArticles,langName),
        "articlesDB": foundArticles
      }

      res.send(dbFiltered);
    } else {
      res.send(err);
    }
  });
});

app.get('/bookArticle/:articleID', (req,res) => {
  const params = req.params.articleID.split(':');
  const lang = params[0];
  const artID = params[1];
  Article.findOne({_id:artID}, function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    } else {
      res.send("No article found");
    }
  });
});


// POST --------------------------------------------------------


// AUTHENTICATION ----------------------------------------------

// AUTH - GET ----------------------------------------



// AUTH - POST ---------------------------------------




// PORT LISTENING ----------------------------------------


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port "+port);
});
