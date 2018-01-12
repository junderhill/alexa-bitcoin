'use strict'

const data = require('../data')
const expect = require('chai').expect

describe('Data module', () => {
    describe('roundAndFormat', () => {
        it('should be a function', () => {
            expect(data.roundAndFormatRate).to.be.a('function');
        })
        it('should round a value to 2 decimal places', () => {
            //arrange
            var input = 100.123;
            //act
            var result = data.roundAndFormatRate(input);
            //assert
            expect(result).to.equal("100.12");
        })
    });
});