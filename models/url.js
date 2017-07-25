var Sequelize = require('sequelize');
var marked = require('marked');

var db = new Sequelize('postgres://localhost:5432/urlshortener', {
    logging: false
});

var Url = db.define('url', {
  original: {
    type: Sequelize.STRING,
    allowNull: true
  },
  shortened: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = {
    Url: Url
};
