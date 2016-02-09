
var expressHandlebars = require('express-handlebars');
var moment = require('moment');
var numeral = require('numeral');

var handlebarsConfig = function(options){

  var helpers = {
    formatDate: function(timestamp){
      return moment(timestamp).format('DD-MM-YYYY');
    },
    json: function(context) {
        return escape(JSON.stringify(context));
    },
    formatPercent: function(percent){
        return numeral(Number(percent) / 100).format('0.00%');
    },
    formatDecimal: function(number){
        return numeral(number).format('0.00');
    }
  }

  var hbs = expressHandlebars.create(
  	{
  		extname: '.hbs',
  		helpers: helpers
  	}
  );

  options.app.engine('.hbs', hbs.engine);
  options.app.set('view engine', '.hbs');

  return {
    handlebars : expressHandlebars
  };
};

module.exports = handlebarsConfig;
