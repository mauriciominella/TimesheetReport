'use strict';

var TogglClient = require('toggl-api');
var _ = require('underscore');
var groupingService = require('../services/groupingService')();

var togglRepository = function(togglUserSettings){

  togglUserSettings = togglUserSettings || { apiToken: 'ff1a00053389e9ccad780fa452eee1ee' };
  var toggl = new TogglClient({apiToken: togglUserSettings.apiToken});

  var getGroupingByDescAndDayByDate = function(start, end, callback){

   toggl.getTimeEntries(start.toISOString(), end.toISOString(), function(err, timeEntries){
        var groupedTimeEntries = groupingService.groupTimeEntries(timeEntries);
        callback(groupedTimeEntries);
    });
  };

  var getAll = function(callback){
    toggl.getTimeEntries(function(err, timeEntries){
         var groupedTimeEntries = groupingService.groupTimeEntries(timeEntries);
         callback(groupedTimeEntries);
     });
  };

  return {
    getGroupingByDescAndDayByDate : getGroupingByDescAndDayByDate,
    getAll : getAll
  };
};

module.exports = togglRepository;
