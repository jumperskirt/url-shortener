// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  
});

function shortenUrl(urlToShorten) {
  var alphaNum = "abcdefghijklmnopqrstuvxyz1234567890";
  var shortUrl = "";
  for (var i = 0; i < 5; i++) {
    var idx = Math.floor(Math.random() * 35);
    shortUrl += alphaNum[idx];
  }  
  shortUrl=`https://www.${shortUrl}.com`;
  urlMatch[shortUrl] = urlToShorten;
  return shortUrl
 
}

function validUrl(url) {
  var protocol = url.slice(0, 4);
  if (protocol === "http") {
    var checkDot = url.split(".");
    if (checkDot.length >= 2) {
      return true;
    }
  }
  return false;
}


app.get("/new/*", function (req, res) {
  var url = req.params[0];
  if (urlMatch[url]) {
    var original = urlMatch[url];
    res.redirect(original);
  } else {
    var urlToShorten = url;
    var shortUrl = validUrl(urlToShorten);
    if (shortUrl) {
      shortUrl = shortenUrl(urlToShorten)
    } else {
      res.json({
      "url": "Not Valid URL"
    });
  }
  
  res.json({
    "original_url": urlToShorten,
    "shortened_url": shortUrl
  });
  }
  
  
});


// app.get("/new/*", function (req, res) {
  
//   var urlToShorten = req.params[0];
//   // var shortUrl;
//   var shortUrl = validUrl(urlToShorten);
//   if (shortUrl) {
//     shortUrl = shortenUrl(urlToShorten)
//   } else {
//     res.json({
//       "url": "Not Valid URL"
//     })
//   }
  
//   res.json({
//     "url": urlToShorten,
//     "shortened-url": shortUrl
//   });
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// // Simple in-memory store for now
var urlMatch = {};


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
