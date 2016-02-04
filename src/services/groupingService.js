'use strict';

var _ = require('underscore');
var timeEntry = require('../models/timeEntry');

var groupingService = function(){

  var groupTimeEntries = function(timeEntries){

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

         /*groupedTimeEntries.push({
           description : firstEntry.description,
           duration: totalDuration,
           startDate: new Date(firstEntry.start)
         });*/

         groupedTimeEntries.push(
            new timeEntry(firstEntry.description, totalDuration, new Date(firstEntry.start))
          );
     };

     return groupedTimeEntries;
  };

  return {
    groupTimeEntries : groupTimeEntries
  };
};

module.exports = groupingService;
