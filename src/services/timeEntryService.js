'use strict';

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

  return {
    getByDate : getByDate
  };
};

module.exports = timeEntryService;
