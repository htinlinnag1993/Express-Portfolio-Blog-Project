// must install node, express, pg, body-parser, ejs to use below features
var express = require('express'); //acquire express library folder
var pg = require('pg'); //acquire a server and pg library folder // pg is the database adaptor
var bodyParser = require('body-parser'); //acquire body-parser library folder

var app = express(); //just to use only one function 'express()', which is express.js in the express folder, everytime app is called

var port = process.env.PORT || 3000; //for setting up database in Heroku database instead of using database in my machine

app.set('view engine', 'ejs'); //setting view engine for template using ejs
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
//bodyParser for parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));
// app.use(bodyParser());

// For Home page(landing page)
app.get('/', function(req, res){
  res.render('home');
})

// For About page
app.get('/about', function(req, res){
  res.render('about');
})

// For Projects page
app.get('/projects', function(req, res){
  res.render('projects');
})

// For Blog Home page
app.get('/blog', function(req, res){
  // below is for setting up database in Heroku database instead of using database in my machine
  // res.send("Hello");
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    if (err){
      return console.log(err);
    }
    client.query(`select * from messages`, function(err, result){
      if (err){
        return console.log(err);
      }
      res.render("blog_home", result);
      done();
      // pg.end();
    });
  });
});

// For Blog Articles Board page
app.get('/blog/content', function(req, res){
  // below is for setting up database in Heroku database instead of using database in my machine
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    if (err){
      return console.log(err);
    }
    client.query(`select * from messages`, function(err, result){
      if (err){
        return console.log(err);
      }
      res.render("blog_board", result);
      done();
      // pg.end();
    });
  });
});

// app.get("/write", function(req, res){
//   res.redirect("/");
// });

// For posting on the Blog Articles Board (Entries into Database)
app.post("/blog/content", function(req, res){
  // below is for setting up database in Heroku database instead of using database in my machine
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    // console.log("before client.query");
    if (err){
      return console.log(err);
    }
    client.query(`insert into messages (title, body, date) values ('${req.body.title}', '${req.body.body}', '${req.body.date}')`, function(err,result){
      if (err){
        return console.log("err");
      }
      res.redirect("/blog/content");
    });
  });
});

// app.listen(3000, function(){
app.listen(port, function(){
  console.log("Listening on port_3000");
});
