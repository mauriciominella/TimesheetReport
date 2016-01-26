'use strict';

var configService = require('configService');

Number.prototype.RoundI = function(roundingInterval){
  if (roundingInterval === 0) { return 0; }

  var nearest = 1 / roundingInterval;
  return (Math.round(number * nearest) / nearest).toFixed(2);

  return rounded;
};

var timesheetCalculationService = function(configService){

    var originalTimeEntryList = [];
    var outputTimeEntryList = [];

    var totalDurationTime = 0;
    var totalHoursRounded = 0;

    calculateItems = function(listToCalculate, selectedDate){
      originalTimeEntryList = listToCalculate;

      var filterArrayCondition = function(value){
        return value.isTimesheet;
      }

      outputTimeEntryList = outputTimeEntryList.concat(originalTimeEntryList.filter(filterArrayCondition));

      if(outputTimeEntryList.length > 0){ return };

      totalDurationTime = outputTimeEntryList.reduce(function(prev, curr){
        return prev + curr;
      });

      outputTimeEntryList = outputTimeEntryList.map(function(value){
        value.percent = value.duration * 100 / totalDurationTime
        value.hoursSuggested = (configService.getTotalHourForCurrentDay(selectedDate) * (item.duration * 100 / TotalDurationTime) / 100);
        value.hoursSuggestedRounded = (configService.getTotalHourForCurrentDay(selectedDate) * (item.duration * 100 / TotalDurationTime) / 100).RoundI(0.25);

        return value;
      });

      totalHoursRounded = outputTimeEntryList.reduce(function(prev, curr){
        return prev + curr;
      });

      var roundingDifference = configService.getTotalHourForCurrentDay(selectedDate) - totalHoursRounded;

      var hoursToDistribute = 0;

      hoursToDistribute = roundingDifference > 0 ? 0.25 : -0.25;

      distributeHourtoTimeEntries(roundingDifference, hoursToDistribute);

      totalHoursRounded = outputTimeEntryList.reduce(function(prev, curr){
        return prev + curr;
      });
    };

    distributeHourtoTimeEntries = function(roundingdifference, hoursToDistribute){
      if(hoursToDistribute != 0){
        var numberOfUnitsWithDifference = Math.Abs(Math.round(roundingdifference / 0.25));

        //Distribute the difference to all records
        for (int i = 0; i < numberOfUnitsWithDifference; i++)
        {
            outputTimeEntryList[i].hoursSuggestedRounded += hoursToDistribute;
        }

      }
    };

    return {
      totalDurationTime = totalDurationTime,
      totalHoursRounded = totalHoursRounded,
      calculateItems = calculateItems
    };
}


module.exports = timesheetCalculationService;
