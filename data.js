var https = require('https');

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

exports.getCurrentPrice = function (callback) {
    var currentPrice = "";
    var prices = {};
    https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                var parsed = JSON.parse(data);
                var usd = this.splitUnitsOfCurrency(this.roundAndFormatRate(parsed.bpi.USD.rate_float));
                var gbp = this.splitUnitsOfCurrency(this.roundAndFormatRate(parsed.bpi.GBP.rate_float));

                prices.usd = this.constructValueSpeech(usd, 'USD');
                prices.gbp = this.constructValueSpeech(gbp, 'GBP');
                callback(prices);
            });
        })
        .on('error', (err) => {
            console.log("Error: " + err.message);
        });
}

exports.constructValueSpeech = function (rate, currency) {
    var units = {};
    switch (currency) {
        case 'GBP':
            units = {
                Main: {
                    Single: " pound",
                    Plural: " pounds"
                },
                Secondary: {
                    Single: " pence",
                    Plural: " pence"
                }
            }
            break;

        case 'USD':
            units = {
                Main: {
                    Single: " dollar",
                    Plural: " dollars"
                },
                Secondary: {
                    Single: " cent",
                    Plural: " cents"
                }
            }
            break;
    }

    var speechOutput = "";
    if (rate.main != 0) {
        speechOutput += rate.main + (rate.main > 1 ? units.Main.Plural : units.Main.Single);
    }
    if (rate.main != 0 && rate.secondary != 0) {
        speechOutput += " and ";
    }
    if (rate.secondary != 0) {
        speechOutput += rate.secondary + (rate.secondary > 1 ? units.Secondary.Plural : units.Secondary.Single);
    }

    return speechOutput;
}

exports.roundAndFormatRate = function (rate) {
    return rate.toFixed(2);
}

exports.splitUnitsOfCurrency = function (rate) {
    var splitValue = {};

    splitValue.main = parseInt(rate.split('.')[0]);

    splitValue.secondary = parseInt(rate.split('.')[1]);
    if (isNaN(splitValue.secondary)) {
        splitValue.secondary = 0;
    }
    return splitValue;
}