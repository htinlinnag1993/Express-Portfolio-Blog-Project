//export POSTGRES_USER=postgres
//export POSTGRES_PASSWORD=TTPsuccess3*
// postgres:TTPsuccess3*

// must install express, pg, body-parser, ejs,

var express = require('express'); //acquire express library folder
var pg = require('pg'); //acquire a server and pg library folder // pg is the database adaptor
var bodyParser = require('body-parser'); //acquire body-parser library folder

var app = express(); //just to use only one function 'express()', which is express.js in the express folder, everytime app is called

app.set('view engine', 'ejs'); //setting view engine for template using ejs
app.set('views', './views');

//bodyParser for parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));
// app.use(bodyParser());

var dbURL = 'postgres://'+ process.env.POSTGRES_USER +':'+ process.env.POSTGRES_PASSWORD +'@localhost:5432/bulletinb'; //setting environment variable. You could also do this in your system setting

app.get('/', function(req, res){
  pg.connect(dbURL, function(err, client, done){
    if (err){
      return console.log("errorConnecting");
    }
    client.query(`select * from bloglogs`, function(err, result){
      if (err){
        return console.log("errorGettingMessages");
      }
      res.render("blog_home", result);
      done();
      pg.end();
    });
  });
});

app.get('/blog_board', function(req, res){
  pg.connect(dbURL, function(err, client, done){
    if (err){
      return console.log("errorConnecting");
    }
    client.query(`select * from bloglogs`, function(err, result){
      if (err){
        return console.log("errorGettingMessages");
      }
      res.render("blog_board", result);
      done();
      pg.end();
    });
  });
});

app.get("/write", function(req, res){
  res.redirect("/");
});

app.post("/write", function(req, res){
  pg.connect(dbURL, function(err, client, done){
    // console.log("before client.query");
    if (err){
      return console.log("errorPosting");
    }
    client.query("insert into bloglogs (title, body, date) values ('" +req.body.title + "','" + req.body.body + "','" + req.body.date + "');", function(err,result){
      //(`insert into messages (email, title, body) values ('`+ req.body.email + `','` + req.body.title + `','` + req.body.body +`');`
      // values ('${req.body.email}','${req.body.title}','${req.body.body}');`
      if (err){
        return console.log("errorWriting");
      }
      res.redirect("/blog_board");
    });
  });
});

app.listen(3000, function(){
  console.log("Listening on port_3000");
});
