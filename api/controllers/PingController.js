module.exports = {
  ping: ping
}

function ping(req, res) {
  var tock, tick = Date.now();
  console.log('ping requested');

  var response = PingService.ping();
  res.send(response);

  tock = Date.now();
  console.log('ping responded', tock - tick);
}
