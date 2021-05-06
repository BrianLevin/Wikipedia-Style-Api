const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const wikiSchema = {
    title: String,
    content: String
  };


const article = mongoose.model("Article", wikiSchema);







app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  