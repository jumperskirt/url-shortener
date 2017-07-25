


var express = require("express");
var Url = require( '../models/url').Url;
// var request = require("request");

var urlApi = express.Router(); //import the routes object


function shortenUrl(urlToShorten) {
  var alphaNum = "abcdefghijklmnopqrstuvxyz1234567890";
  var shortUrl = "";
  for (var i = 0; i < 5; i++) {
    var idx = Math.floor(Math.random() * 35);
    shortUrl += alphaNum[idx];
  }
  shortUrl=`https://www.${shortUrl}.com`;
  return shortUrl;

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



// urlApi.get('/new/*', function (req, res, next) {
//     var url = req.params[0];
//     console.log(url);
//     // console.log(this.id)
//     var shortened = shortenUrl(url);
//     var matchedUrl = {
//       "original": url,
//        "shortened": shortened
//     }
//
//   if (validUrl(url)) {
//   Url.findOrCreate({
//     where: {
//       original: url
//     }
//   })
//   .spread(function(url, created) {
//
//     return Url.create(matchedUrl)
//       .then(function(match) {
//       return match;
//     });
//   })
//   .then(function(match) {
//     // var id = match.id
//     res.send(match);
//   })
//   .catch(next);
//
// } else {
//       res.json({
//       "url": "Not Valid URL"
//     });
// }
// });



urlApi.get('/new/*', function (req, res, next) {
    var url = req.params[0];
    console.log(url);
    // console.log(this.id)
    var shortened = shortenUrl(url);
    var matchedUrl = {
      "original": url,
       "shortened": shortened
    }

  if (validUrl(url)) {
    Url.findOrCreate({
      where: {
        shortened: url
      }
    })
  .spread(function(entry, created) {
    if (!created) {
      var originalUrl = entry.original;
      res.redirect(originalUrl)
    } else {
      return Url.create(matchedUrl)
        .then(function(match) {
        return match;
      });
    }

  })
  .then(function(match) {
    res.send(match);
  })
  .catch(next);

} else {
      res.json({
      "url": "Not Valid URL"
    });
}
});
module.exports = urlApi;
