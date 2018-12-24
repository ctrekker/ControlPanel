var net = require('net');
var server = net.createServer();

module.exports = function(args, callback) {
    var alreadyCalled = false;
    function constructResponse(inUse) {
        return {
            "indicators": [
                {
                    "type": "boolean",
                    "value": inUse
                }
            ]
        }
    }
    server.once('error', function (err) {
        if(!alreadyCalled) {
            callback(constructResponse(true));
            alreadyCalled = true;
        }
        server.close();
    });

    server.once('listening', function () {
        if(!alreadyCalled) {
            callback(constructResponse(false));
            alreadyCalled = true;
        }
        server.close();
    });

    server.listen(args[0]);
};