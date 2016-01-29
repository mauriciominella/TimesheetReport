'use strict';

var configService = require('../../src/services/configService')()
  ,togglRepository = require('../../src/repository/togglRepository')()
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;

xdescribe('TogglRepository(Integration)', function(){
  it('Should return data from API', function(done){

      var callback = function(response){
        expect(response.length).to.be.above(0);
        done();
      };

     togglRepository.getAll(callback);
  });
});
