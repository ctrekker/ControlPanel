var fs = require('fs');
readLastLines = require('read-last-lines');

module.exports = function(args, callback) {
    readLastLines.read(args[0], args[1] || 10).then(function (lines) {
        console.log(lines);
        return {
            "indicators": [
                {
                    "type": "console",
                    "lines": lines
                }
            ]
        };
    }).catch(function(err) {

    });
};