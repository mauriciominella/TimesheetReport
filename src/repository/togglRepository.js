'use strict';

var TogglClient = require('toggl-api');
var _ = require('underscore');
var timeEntryService = require('../services/timeEntryService')();

var togglRepository = function(togglUserSettings){

  togglUserSettings = togglUserSettings || { apiToken: 'ff1a00053389e9ccad780fa452eee1ee' };

  var toggl = new TogglClient({apiToken: togglUserSettings.apiToken});

  var getGroupingByDescAndDayByDate = function(date, callback){

   toggl.getTimeEntries(function(err, timeEntries){
        var groupedTimeEntries = timeEntryService.groupTimeEntries(timeEntries);
        callback(groupedTimeEntries);
    });
  };

  return {
    getGroupingByDescAndDayByDate : getGroupingByDescAndDayByDate
  };
};

module.exports = togglRepository;
