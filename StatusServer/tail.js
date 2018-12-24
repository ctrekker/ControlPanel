var fs = require('fs');
readLastLines = require('read-last-lines');

module.exports = function(args, callback) {
    readLastLines.read(args[0], args[1] || 10).then(function (lines) {
        callback({
            "indicators": [
                {
                    "type": "console",
                    "lines": lines.split('\r\n')
                }
            ]
        });
    }).catch(function(err) {

    });
};