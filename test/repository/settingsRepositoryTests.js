'use strict';

  var chai = require('chai')
  ,should = chai.should()
  ,expect = chai.expect;

describe('Settings Repository', function(){
  it('Should return and error when settingsModel has not been passed', function(){

    expect(require('../../src/repository/settingsRepository')({})).to.throw(Error);
  });
});
