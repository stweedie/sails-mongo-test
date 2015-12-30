module.exports = {
  findAll: findAll
};

function findAll() {
  return User.find();
}
