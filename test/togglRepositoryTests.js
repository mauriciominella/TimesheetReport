'use strict';

var configService = require('../src/services/configService')()
  ,togglRepository = require('../src/repository/togglRepository')()
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

describe.only('repository test', function(){
  it('first test', function(done){

      var callback = function(response){
        expect(response.length).to.be.above(0);
        done();
      };

     togglRepository.getGroupingByDescAndDayByDate(new Date(), callback);
  });
});
