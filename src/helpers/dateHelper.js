'use strict';

var momentJs = require('moment');


var dateHelper = function(){

  momentJs.locale('pt-br');

  var moment = function(){
    return momentJs;
  };

  var getDateFormat = function(){
    return 'DD/MM/YYYY';
  };

  return {
    moment: moment,
    getDateFormat: getDateFormat
  };

};

module.exports = dateHelper;
