const bcrypt = require("bcryptjs");

module.exports = {

  ensureAuthenticated(req, res, next) {

    console.log(req.isAuthenticated())
    if (!req.isAuthenticated()){
      res.status(401).send("Unauthorized")
    } else {
      next();
    }
  },

  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
}