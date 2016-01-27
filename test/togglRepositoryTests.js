'use strict';

var configService = require('../src/services/configService')()
  ,togglRepository = require('../src/repository/togglRepository')()
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe.only('repository test', function(){
  it('first test', function(done){

      var arr = [];
      var callback = function(response){
        console.log(response);
        arr = response;
        expect(arr.length).to.be.above(0);
        done();

      };

     togglRepository.getGroupingByDescAndDayByDate(new Date(), callback);
  });
});
