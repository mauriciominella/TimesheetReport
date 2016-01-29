'use strict';

var dateService = function(){

  var getDateRange = function (date){

    var startDate = new Date(date.toISOString());
    startDate.setHours(0, 0, 1);

    var endDate = new Date(date.toISOString());
    endDate.setHours(23, 59, 59);

    return {
      start : startDate,
      end : endDate
    };
  };

  return{
    getDateRange : getDateRange
  };
};

module.exports = dateService;
