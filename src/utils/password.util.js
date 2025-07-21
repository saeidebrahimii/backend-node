const bcrypt = require("bcrypt");
async function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 13);
  return hash;
}
async function compareHashPassword(password, hashPassword) {
  const compare = bcrypt.compareSync(password, hashPassword);
  return compare;
}
module.exports = { hashPassword, compareHashPassword };
