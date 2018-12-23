var cpuStat = require('cpu-stat');
module.exports = function(callback) {
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
