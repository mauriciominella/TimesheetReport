'use strict';

var TogglClient = require('toggl-api');
var _ = require('underscore');

var togglRepository = function(togglUserSettings){

  var url = 'https://www.toggl.com/api/v8/time_entries';
  togglUserSettings = togglUserSettings || { apiToken: 'ff1a00053389e9ccad780fa452eee1ee' };

  var toggl = new TogglClient({apiToken: togglUserSettings.apiToken});

  var groupTimeEntriesByDescriptionAndDate = function(timeEntries){

      var groupedTimeEntries = [];

      var getDateFromISODate = function(date){
          return String(date).match(/(\d{4})-(\d{2})-(\d{2})/, 'g')[0];
      };

     var groups = _.groupBy(timeEntries, function(timeEntry){
         return timeEntry.description + ' ' + getDateFromISODate(timeEntry.start);
     });

     for(var item in groups){

         var entries = groups[item];
         var firstEntry = groups[item][0];

         var totalDuration = entries.reduce(function(prev, curr){
           return prev + Number(curr.duration);
         }, 0);

         groupedTimeEntries.push({
           description : firstEntry.description,
           duration: totalDuration,
           startDate: new Date(firstEntry.start)
         });
     };

     return groupedTimeEntries;
  };

  var getGroupingByDescAndDayByDate = function(date, callback){

   toggl.getTimeEntries(function(err, timeEntries){
        var groupedTimeEntries = groupTimeEntriesByDescriptionAndDate(timeEntries);
        callback(groupedTimeEntries);
    });
  };

  return {
    getGroupingByDescAndDayByDate : getGroupingByDescAndDayByDate
  };
};

module.exports = togglRepository;
