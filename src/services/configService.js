'use strict';

var configService = function(){

  var getTotalHourForCurrentDay = function(date){
    //date.getDay();
    return 7.5;
  };

  return {
    getTotalHourForCurrentDay : getTotalHourForCurrentDay
  };
};

module.exports = configService;
