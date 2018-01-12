'use strict'

var expect = require('chai').expect,
lambdaToTest = require('../app')

const context = require('aws-lambda-mock-context');
const ctx = context();

describe('Get current price', ()=>{
    var speechResponse = null;
    var speechError = null;

    before(function(done){
       lambdaToTest.handler(require('./CurrentPriceRequest.json'), ctx)

       ctx.Promise
       .then(resp => {speechResponse = resp; done();})
       .catch(err => {speechError = err; done();});
    })

    it('should not have errored',function() {
        expect(speechError).to.be.null
    })

    it('should have a response',function(){
        expect(speechResponse.response).not.to.be.null
    })

    it('should have a speech formatted with speech tags',function(){
        expect(speechResponse.response.outputSpeech.ssml).to.contain("<speak>")
    })
});
