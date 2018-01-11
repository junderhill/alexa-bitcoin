var Alexa = require('alexa-sdk');
var data = require('./data.js');

const skillName = "Bitcoin Price";

var handlers = {
    "AMAZON.HelpIntent": function(){
        var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        this.emit(':ask', speechOutput, speechOutput);
    },
    
    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "CurrentPrice": function(){
        var speechOutput = "";
        var prices = data.getCurrentPrice();
        speechOutput += "Bitcoin is currently " + prices.usd + " U.S dollars or " + prices.gbp + " British pounds.";

        this.emit(':tell', speechOutput);
    }
};

exports.handler = function(event, context){
    var alexa = Alex.handler(event, context);
    alexa.appId = "amzn1.ask.skill.e4ee2508-f2b3-400b-96bc-1deb6ccce518";
    alexa.registerHandlers(handlers);
    alexa.execute();
}