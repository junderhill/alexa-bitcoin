var https = require('https');

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

exports.getCurrentPrice = function(callback){
    var currentPrice = "";
    var prices = {};
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            var parsed = JSON.parse(data);
            prices.usd = this.roundAndFormatRate(parsed.bpi.USD.rate_float);
            prices.gbp = this.roundAndFormatRate(parsed.bpi.GBP.rate_float);
            callback(prices);
        });
    })
    .on('error', (err) => {
        console.log("Error: " + err.message);
    });
}


exports.roundAndFormatRate = function(rate){
    return rate.toFixed(2);
}