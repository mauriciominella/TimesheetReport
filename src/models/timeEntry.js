'use strict';
var moment = require('moment');

var TimeEntry = function(description, duration, startDate, isTimesheet){
  this.description = description;
  this.duration = duration;
  this.startDate = startDate;
  this.percent = 0;
  this.isTimesheet = isTimesheet || false;
  this.hoursSuggested = 0;
  this.hoursSuggestedRounded = 0;

  Object.defineProperty(this, 'getDurationInHours', {
      get: function() {
          return moment().startOf('day').seconds(this.duration).format('HH:mm:ss');
      }
  });

};

module.exports = TimeEntry;
