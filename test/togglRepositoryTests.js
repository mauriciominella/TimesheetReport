'use strict';

var configService = require('../src/services/configService')()
  ,togglRepository = require('../src/repository/togglRepository')()
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe.only('repository test', function(){
  it('first test', function(){
     var arr = togglRepository.getGroupingByDescAndDayByDate(new Date());

     expect(arr.length).to.be.above(0);
  });
});
