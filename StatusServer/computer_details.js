var cpuStat = require('cpu-stat');
module.exports = function(args, callback) {
    cpuStat.usagePercent({
        sampleMs: 1000
    },
    function(err, percent, seconds) {
        if (err) {
            console.log(err);
        }
        callback({
            "indicators": [
                {
                    "type": "value",
                    "value": percent
                }
            ]
        });
    });
};
