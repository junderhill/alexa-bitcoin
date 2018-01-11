var https = require('https');

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

exports.getCurrentPrice = function(callback){
    console.log("getCurrentPrice()");
    var currentPrice = "";
    var prices = {};
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            console.log("Data: " + data);
            var parsed = JSON.parse(data);
            console.log("Parsed: " + parsed);
            console.log(data);
            console.log(data['bpi']['USD']);
            console.log(data.chartName);
            console.log(data.bpi.USD);
            prices.usd = data.bpi.USD.rate;
            prices.gbp = data.bpi.GBP.rate;

            callback(prices);
        });
    })
    .on('error', (err) => {
        console.log("Error: " + err.message);
    });
}
