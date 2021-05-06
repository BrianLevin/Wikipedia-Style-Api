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

app.get("/articles", function(req,res){
// query db and find documents inside articles collection
    Article.find(function(req,foundArticles){

        if(!err){
            // found articles
            res.send(foundArticles)

        } else{
            res.send(err)
        }

    });
});

app.post("/articles", function (req,res){
// grab data sent through
    console.log();
     console.log();
// document which will hold the collection values
     const newArticle = new Article ({
         title: req.body.title,
         content:req.body.content
     });
     // save post to db
     newArticle.save()
});





app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  