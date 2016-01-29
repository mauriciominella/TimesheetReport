'use strict';

var timeEntryService = require('../../src/services/timeEntryService')({togglRepository: {}, dateService: {}})
    ,chai = require('chai')
    ,should = chai.should()
    ,expect = chai.expect;
