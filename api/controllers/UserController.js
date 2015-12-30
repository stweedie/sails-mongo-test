module.exports = {
  findAll: findAll
}


function findAll(req, res) {
  var tock, tick = Date.now();
  console.log('users requested');

  return UserService.findAll()
    .then(function(data) {
      res.send(data.slice(0, 50));

      tock = Date.now();
      console.log('users responded', tock - tick);
    });
}
