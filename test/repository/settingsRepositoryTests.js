'use strict';


  var chai = require('chai')
  ,should = chai.should()
  ,expect = chai.expect;

describe('Settings Repository', function(){

  describe('SaveSettings', function(){

    it('Should thrown an error when options are not passed', function(){
      var settingsRepository = require('../../src/repository/settingsRepository')({});
      expect(settingsRepository.saveSettings).to.throw(Error);
    });

  });
});
