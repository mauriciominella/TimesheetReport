'use strict';

var Student = require('../src/services/timesheetCalculationService')
    ,Course = require('../src/service/configService')
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe('Calculation Service', function(){
  it('Rounded hours correctness using specific scenarion 1', function(){
    var timeEntryList = [
      {
        description = "144449:6.4.0.4 - Set system context on login into Student Self-Management and Learner Portals",
        start = new DateTime(2014, 1, 11),
        duration = 20284,
        isTimesheet = true
      },
      {

      }
    ];
  });
});
