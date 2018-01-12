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
        var self = this;
        var callback = function(prices){
            var speechOutput = "";
            speechOutput += "Bitcoin is currently " + prices.usd + " or " + prices.gbp;
            self.emit(':tell', speechOutput);
        };
        var prices = data.getCurrentPrice(callback);
    }
};

exports.handler = function(event, context){
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.e4ee2508-f2b3-400b-96bc-1deb6ccce518";
    alexa.appId = 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe';
    alexa.registerHandlers(handlers);
    alexa.execute();
}