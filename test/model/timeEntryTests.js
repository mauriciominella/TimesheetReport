'use strict';

var timeEntry = require('../../src/models/timeEntry')
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe('TimeEntry', function(){
  it('Should populate properties properly', function(){
      var entry = new timeEntry('desc', 1500, new Date(2016, 1, 1));

      entry.description.should.be.equal('desc');
      entry.duration.should.be.equal(1500);
      entry.startDate.toISOString().should.be.equal(new Date(2016, 1, 1).toISOString());
  });

  it('Should convert duration from seconds to hh:mm:ss format', function(){
      var entry = new timeEntry('desc', 1500, new Date(2016, 1, 1));

      entry.getDurationInHours.should.be.equal('00:25:00')
  });
});
