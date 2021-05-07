const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// Creating app which utilizes the express package
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
  };


const Article = mongoose.model("Article", articleSchema);


///////////// Requests targeting all articles

app.route("/articles")

.get(function(req,res){
    // query db and find documents inside articles collection
        Article.find(function(err,foundArticles){
    
            if(!err){
                // found articles
                res.send(foundArticles)
    
            } else{
                res.send(err)
            }
    
        });
    }).post(function (req,res){
            // grab data sent through
                console.log();
                 console.log();
            // document which will hold the collection values
                 const newArticle = new Article ({
                     title: req.body.title,
                     content:req.body.content
                 });
                 // save post to db
                 newArticle.save(function(err){
                     if(!err){
                     res.send("Sucessfully added a new article");
                     } else{
                         res.send(err);
                     }
                 });
            
            }).delete(function(req,res){
                    Article.deleteMany(function(err){
                        if (!err){
                            res.send("succesfully deleted all articles.");
                        } else {
                            res.send(err)
                        }
                    });
                });





///////////// Requests targeting all articles frequests targeting a specific article
// app.route to get specofic articles
app.route("/articles/:articleTitle")


.get(function(req,res){

   
// look through collection of articles, find one document,  where title is = to request parameters
Article.findOne({title:req.params.articleTitle }, function(err, foundArticle){
if (foundArticle) {
    res.send(foundArticle);
} else{
    res.send("no articles matching that title was found");
}

});

})

.put(function(req,res){
Article.update(
    // look for article
    {title:req.params.articleTitle },

    // update article
    {title:req.body.title, content: req.body.content},
    
    {overwrite: true},
    function(err) {
        if(err) {
            res.send("Sucessfully updated article")
        }
    }

)

});


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  