'use strict';

var TogglClient = require('toggl-api');
var linq = require('linqsharp').default;
var axios = require('axios');


var togglRepository = function(togglUserSettings){

  var url = "https://www.toggl.com/api/v8/time_entries";
  togglUserSettings = togglUserSettings || {apiToken: 'ff1a00053389e9ccad780fa452eee1ee' };

  var toggl = new TogglClient({apiToken: togglUserSettings.apiToken});

  var getGroupingByDescAndDayByDate = function(date){

    var arrResult = [];

    /*var options = {
      url: url,
      auth: {
        user: 'ff1a00053389e9ccad780fa452eee1ee',
        password: 'apiToken'
      }
}*/

//    toggl.getTimeEntries('2016-01-25T15:42:46+02:00', '2013-01-26T15:42:46+02:00', function(err, timeEntries){
//    request(options, function(err, res, timeEntries){
      axios.get(url, {Authorization: 'Basic ' + togglUserSettings.apiToken}).then(function(data){


     console.log('chamou');
      console.log(err);
      arrResult = new linq(timeEntries).GroupBy(function(obj){
        return {
          description: obj.description,
          startDate: new Date(obj.start.getFullYear(),
          obj.start.getMonth() - 1, obj.start.getDate())
        };
      }).Select(function(obj){
        return {
          description: obj.Key.description,
          start: obj.Key.startDate,
          duration: new linq(obj.Elements).Sum(function(c){ return c.duration })
         };
      }).ToArray();


    });

      return arrResult;
  };

  return {
    getGroupingByDescAndDayByDate : getGroupingByDescAndDayByDate
  };
};

module.exports = togglRepository;
