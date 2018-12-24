var net = require('net');
var readline = require('readline');
var fs = require('fs');

// Set up status listeners
var status_list = require('./status_list.json');
var status_items = Object.keys(status_list);
var status_data = {};
for(var i=0; i<status_items.length; i++) {
    var item_name = status_items[i];
    var status_item = status_list[item_name];

    setInterval(updateStatus(item_name, status_item), status_item.refresh);
}

var updateStatusCallbacks = [];
function updateStatus(name, status_item) {
    return function() {
        require(status_item.script)(status_item.args, function(status_packet) {
            status_packet['name'] = name;
            for(var cid in updateStatusCallbacks) {
                updateStatusCallbacks[cid](status_packet);
            }
        });
    }
}

var server = net.createServer(function(socket) {
    var i = readline.createInterface(socket, socket);
    i.on('line', function(line) {
        var command = line.split(' ');
        console.log(command);
        switch(command[0].toLowerCase()) {
            case 'exit':
                close();
                break;
        }
        currentCommand = '';
    });
    socket.on('error', function (err) {
        console.log(err);
    });
    updateStatusCallbacks.push(function(packet) {
        socket.write(JSON.stringify(packet)+'\r\n');
    });
    var clientIndex = updateStatusCallbacks.length-1;
    function close() {
        socket.destroy();
        updateStatusCallbacks.splice(clientIndex, 1);
    }
});

server.listen(3001);

/*
  "stockstore": {
    "script": "~/stockstore.js",
    "refresh": 10000
  },
  "IntradayDownloader": {
    "script": "~/DataAnalytics/IntradayDownloader/s.json",
    "refresh": 1000
  },
 */