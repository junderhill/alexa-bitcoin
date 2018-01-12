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

    describe('Construct value speech section', () => {
        it('should say dollars and cents for GBP', function(){
            var rate = {
                main: 100,
                secondary: 10
            };
            var currency = 'USD';
            
            var result = data.constructValueSpeech(rate, currency);

            expect(result).to.contain("100 dollars");
            expect(result).to.contain("10 cents");
        })
        it('should say pounds and pence for GBP', function(){
            var rate = {
                main: 100,
                secondary: 10
            };
            var currency = 'GBP';
            
            var result = data.constructValueSpeech(rate, currency);

            expect(result).to.contain("100 pounds");
            expect(result).to.contain("10 pence");
        })

        it('should not contain the secondary unit if it was zero', function(){
            var rate = {
                main: 100,
                secondary: 0
            };
            var currency = 'GBP';
            
            var result = data.constructValueSpeech(rate, currency);
            expect(result).not.to.contain(" pence");
        })

        it('should not contain the main unit or "and" if it was zero', function(){
            var rate = {
                main: 0,
                secondary: 50
            };
            var currency = 'GBP';
            
            var result = data.constructValueSpeech(rate, currency);
            expect(result).not.to.contain("and");
            expect(result).not.to.contain("0 pounds");
        })

        it('should use the singular main unit if only 1', function(){
            var rate = {
                main: 1,
                secondary: 50
            };
            var currency = 'GBP';
            
            var result = data.constructValueSpeech(rate, currency);
            expect(result).not.to.contain("pounds");
            expect(result).to.contain("1 pound");
        })
    })

    describe('Split units of currency', () => {
        it('should return a whole number with zero for secondary if no secondary unit', function(){
            var input = "1500";

            var result = data.splitUnitsOfCurrency(input);

            expect(result.main).to.equal(1500);
            expect(result.secondary).to.equal(0);
        })

        it('should return a two values number if secondary unit', function(){
            var input = "1500.23";

            var result = data.splitUnitsOfCurrency(input);

            expect(result.main).to.equal(1500);
            expect(result.secondary).to.equal(23);
        })

        it('should return zero main number if just secondary unit', function(){
            var input = "0.95";

            var result = data.splitUnitsOfCurrency(input);

            expect(result.main).to.be.equal(0);
            expect(result.secondary).to.equal(95);
        })
    })
});