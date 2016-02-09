
var expressHandlebars = require('express-handlebars');
var dateHelper = require('../helpers/dateHelper')();
var numeral = require('numeral');

var handlebarsConfig = function(options){

  var moment = dateHelper.moment();

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
    },
    weekDayString: function(date){
        return moment(date, dateHelper.getDateFormat()).format('dddd');
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
