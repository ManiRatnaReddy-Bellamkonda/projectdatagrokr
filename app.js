//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();




app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-mani:Mani@1999@cluster0.xa7r1.mongodb.net/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userschema = new mongoose.Schema({
  email : String,
  password : String,
  name : String,
  pub : String


});





const User =new mongoose.model("User", userschema);









app.get("/",function(req,res){
  res.render("home");
});



app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login",function(req,res){
 const un = req.body.username;
 const ps = req.body.password ;



User.findOne({email : un}, function(err,f){
  if(err){console.log(err);}
  else{
    if(f){



    bcrypt.compare(ps,f.password, function(err, result) {
    // result == true
    if(result===true){ res.render("secretsl", {q : f.name}); }
});
  }
  }
})

})


app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register", function(req,res){


  bcrypt.hash( req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      const newuser = new User({
        email: req.body.username,
        name: req.body.nam,
        password: hash,

      });


      newuser.save(function(err){
        if(err){console.log(err);}
        else{res.render("secrets", {n : newuser.name});}
      });


  });



});


app.post("/pos", function(req,res){
  const p = req.body.pos;

  const newu = new User({
    pub:req.body.pos,
  });
  newu.save();
  res.redirect("/all")
  })

  app.get("/all", function(req,res){

    User.find({},function(err,found){
      if(err){console.log(err);}
      else{res.render("all", { ge : found});}
  })









  })



  app.get("/logout", function(req,res){
    res.render('home');
  })


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {

  console.log("server up");

});










//
// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
