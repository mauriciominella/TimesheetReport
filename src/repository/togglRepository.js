'use strict';

var TogglClient = require('toggl-api');
var linq = require('linqsharp').default;

var togglRepository = function(togglUserSettings){

  var url = "https://www.toggl.com/api/v8/time_entries";
  togglUserSettings = togglUserSettings || {apiToken: 'ff1a00053389e9ccad780fa452eee1ee' };

  var toggl = new TogglClient({apiToken: togglUserSettings.apiToken});

  var getGroupingByDescAndDayByDate = function(date, callback){

   toggl.getTimeEntries(function(err, timeEntries){

     console.log('chamou');
      console.log(err);
      var arrResult = new linq(timeEntries).GroupBy(function(obj){
        return {
          description: obj.description,
          startDate: new Date(new Date(obj.start).getFullYear(), new Date(obj.start).getMonth() - 1, new Date(obj.start).getDate())
        };
      }).Select(function(obj){
        return {
          description: obj.Key.description,
          start: obj.Key.startDate,
          duration: new linq(obj.Elements).Sum(function(c){ return c.duration })
         };
      }).ToArray();

      callback(timeEntries);
    });

  };

  return {
    getGroupingByDescAndDayByDate : getGroupingByDescAndDayByDate
  };
};

module.exports = togglRepository;
