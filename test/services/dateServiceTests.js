'use strict';

var dateService = require('../../src/services/dateService')()
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe('DateService.getDateRange()', function(){

  var dateRange;

  beforeEach(function(){
    var date = new Date(2016, 11, 20);
    dateRange = dateService.getDateRange(date);
  });

  it("Shouldn't be null", function(){
    expect(dateRange).not.to.be.undefined;
    expect(dateRange).not.to.be.null;
  });

  it('Date parts should be correct', function(){
    expect(dateRange.start.getFullYear()).to.be.equal(2016);
    expect(dateRange.start.getMonth()).to.be.equal(11);
    expect(dateRange.start.getDate()).to.be.equal(20);
  });

  it('Time parts should be correct', function(){
    expect(dateRange.start.getHours()).to.be.equal(0);
    expect(dateRange.start.getMinutes()).to.be.equal(0);
  });

});
