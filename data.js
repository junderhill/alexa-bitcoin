var https = require('https');

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

exports.getCurrentPrice = function(){
    var currentPrice = "";
    var prices = {};
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            var parsed = JSON.parse(data);

            prices.usd = data.bpi.USD.rate;
            prices.gbp = data.bpi.GBP.rate;

            return prices;
        });
    })
    .on('error', (err) => {
        console.log("Error: " + err.message);
    });
}
