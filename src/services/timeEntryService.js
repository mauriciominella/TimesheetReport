'use strict';

var timeEntry = require('../models/timeEntry');

var timeEntryService = function(options){

 if(!options.togglRepository)
    throw new Error('Options.togglRepository is required');

  if(!options.dateService)
    throw new Error('Options.dateService is required');

  var repository = options.togglRepository;

  var getByDate = function(date, callback){

    if(!typeof(date))
      throw new Error('timeEntryService.getByDate - invalid date: ' + date);

    var dateRange = options.dateService.getDateRange(date);

    repository.getGroupingByDescAndDayByDate(dateRange.start, dateRange.end, callback);
  };

  var mapToTimeEntry = function(rawTimeEntries){
      return rawTimeEntries.map(function(value){
          return new timeEntry(value.description, value.duration, value.startDate, true);
      });
  };

  return {
    getByDate : getByDate,
    mapToTimeEntry : mapToTimeEntry
  };
};

module.exports = timeEntryService;
