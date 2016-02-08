'use strict';

var momentJs = require('moment');
momentJs.locale('pt-br');

var dateHelper = function(){

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
