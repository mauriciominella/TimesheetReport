'use strict';

var configService = require('../src/services/configService')()
  ,calculationService = require('../src/services/timesheetCalculationService')(configService)
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe('Calculation Service', function(){
  it('Rounded hours correctness using specific scenarion 1', function(){

   var timeEntryList = new Array(
      {
        description: "144449:6.4.0.4 - Set system context on login into Student Self-Management and Learner Portals",
        start: new Date(2014, 1, 11),
        duration : 20284,
        isTimesheet : true,
        percent : 0,
        hoursSuggested : 0,
        hoursSuggestedRounded : 0
      },
      {
        description : "Stand Up",
        start : new Date(2014, 1, 11),
        duration : 611,
        isTimesheet : true,
        percent : 0,
        hoursSuggested : 0,
        hoursSuggestedRounded : 0
      },
      {
        description : "144269:6.4.4.2 Apps In Client: Limit editing of a Learner's applications where context doesn't match",
        start : new Date(2014, 1, 11),
        duration : 8298,
        isTimesheet : true,
        percent : 0,
        hoursSuggested : 0,
        hoursSuggestedRounded : 0
      }
    );

    calculationService.calculateItems(timeEntryList, new Date()).totalHoursRounded.should.equal(7.5);
  });
});
