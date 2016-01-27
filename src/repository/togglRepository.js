'use strict';

var TogglClient = require('toggl-api');
var _ = require('underscore');

var togglRepository = function(togglUserSettings){

  var url = "https://www.toggl.com/api/v8/time_entries";
  togglUserSettings = togglUserSettings || {apiToken: 'ff1a00053389e9ccad780fa452eee1ee' };

  var toggl = new TogglClient({apiToken: togglUserSettings.apiToken});

  var getGroupingByDescAndDayByDate = function(date, callback){

   toggl.getTimeEntries(function(err, timeEntries){

       var groups = _.groupBy(timeEntries, function(timeEntry){
           return timeEntry.description + ' ' + /(\d{4})-(\d{2})-(\d{2})/g.exec(timeEntry.start)[0];
       });

       console.log(groups);
      //callback(timeEntries);
    });

  };

  return {
    getGroupingByDescAndDayByDate : getGroupingByDescAndDayByDate
  };
};

module.exports = togglRepository;
