'use strict';

var configService = require('../../src/services/configService')()
  ,calculationService = require('../../src/services/calculationService')(configService)
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe('CalculationService', function(){
  it('Rounded hours correctness using specific scenario 1', function(){

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

  it('Rounded hours correctness using specific scenario 2', function(){

    var timeEntryList = new Array(
       {
         description : "231386:PublishAssessmentResults message publishing when it is not viewable by Learner",
         start : new Date(2014, 2, 19),
         duration : 5724,
         isTimesheet : true,
         percent : 0,
         hoursSuggested : 0,
         hoursSuggestedRounded : 0
       },
       {
         description : "230322:E2E_NLP_Grading Scheme Code is not updated in 158 and 162 instances",
          start : new Date(2014, 2, 19),
          duration : 9231,
        isTimesheet : true,
         percent : 0,
         hoursSuggested : 0,
         hoursSuggestedRounded : 0
       },
       {
         description : "Meeting about Tafe Bugs",
         start : new Date(2014, 2, 19),
         duration : 1981,
         isTimesheet : true,
         percent : 0,
         hoursSuggested : 0,
         hoursSuggestedRounded : 0
       },
       {
         description : "231764: E2E_ACN_CHESSN number is not saved in ebs4",
         start : new Date(2014, 2, 19),
         duration : 7323,
         isTimesheet : true,
         percent : 0,
         hoursSuggested : 0,
         hoursSuggestedRounded : 0
       }
     );

     calculationService.calculateItems(timeEntryList, new Date()).totalHoursRounded.should.equal(7.5);

  });
});
