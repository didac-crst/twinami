const getRoute = require("express").Get();
const Article = require("../models/article-model");
const staticContent = require("../public/content/json-content");


// GET --------------------------------------------------------

// Provide Image
getRoute('/image/:imageName', (req,res) =>{
  //your object
  const filePath = __dirname + '/public/images/' + req.params.imageName;
  res.sendFile(filePath);
});
//
// // Provide static content
// route.get('/content/:page', (req, res) => {
//
//   function createPackage(content,lang,route){
//     // Deconstracting Object
//     const {[lang]: langPack} = content;
//     const mergedPack = _.merge(langPack, content.Files)
//     const {[route]: newContent} = mergedPack;
//     return newContent;
//   }
//
//   const input = req.params.page.split(':');
//   const routeName = input[0];
//   const langName = input[1];
//   const contentFiltered = createPackage(staticContent,langName,routeName);
//   res.send(contentFiltered);
// });
//
// route.get('/db/:page', (req, res) => {
//   const routeName = req.params.page;
//
//   Article.find(function(err, foundArticles){
//     if(!err){
//       const dbFiltered = {
//         // "articlesMeta": filterArticlesLang(foundArticles,langName),
//         "articlesDB": foundArticles
//       }
//
//       res.send(dbFiltered);
//     } else {
//       res.send(err);
//     }
//   });
// });
//
// route.get('/bookArticle/:articleID', (req,res) => {
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
//
//
// // POST --------------------------------------------------------
//
// route.post('/', (req, res) => {
//
// });


module.exports = getRoute;
