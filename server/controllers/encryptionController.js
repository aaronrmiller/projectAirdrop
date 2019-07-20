const db = require('../models/testModel');
//best way to query database?
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


module.exports = {
  encryptPassword(req, res, next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(req.body.pw, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        req.body.pw = hash;
        next();
      });
    });
  }
};



