const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
var crypto = req.body.crypto;
var fiat = req.body.fiat;
var amount = req.body.amount;
var myAPIKey = "MjFjYWU0ODYwYjdjNGFkOTgxYmI1ZjdiMTE3MzM0ZDk";
//var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
//var customURL = baseURL+ cypto+ fiat;

var options = {
  url:"https://apiv2.bitcoinaverage.com/convert/global",
  method:"GET",
  qs:{
    from:crypto,
    to: fiat,
    amount: amount
  },
  headers: {
         'x-ba-key': myAPIKey
  }
};
  request(options, function(error,response,body){
    //console.log(body);
    var data = JSON.parse(body);

     res.write("<p> The current timestamp is "+ data.time+ "</p>");
     res.write("<h1>"+ amount + crypto + " is currently worth "+ data.price + fiat+ "</h1>");
    res.send();

  });
});

app.listen(3000, function(){
  console.log("Server started on 3000");
});
