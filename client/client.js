var http = require('http');

var baseUrl = 'http://localhost:1337';
var usersUrl = baseUrl + '/users';
var pingUrl = baseUrl + '/ping';

// send new ping request every 250 ms.
var pingInterval = 250;

var interval = setInterval(getPing, pingInterval);
getUsers();

function getPing() {
  var tock, tick = Date.now();
  console.log('GET /ping');
  http.get(pingUrl, function(res) {

    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      tock = Date.now();
      console.log('GET /ping responded with', body, 'in', tock - tick, 'ms');
    });

  });
}

function getUsers() {
  var tock, tick = Date.now();
  console.log('GET /users');
  http.get(usersUrl, function(res) {
    var body = '';
    res.on('data', function(data) {

      body += data;
    });

    res.on('end', function() {
      var users = JSON.parse(body);
      tock = Date.now();
      console.log('GET /users responded with', users.length, 'users in', tock - tick, 'ms');
      clearInterval(interval);
    });
  });
}
