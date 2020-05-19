var db = require('../db');
var md5 = require('md5');

var shortid = require('shortid');


module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({ email: email}).value();
  if(!user) {
    res.render('auth/login',{
      errors: [
        'Email does not exist.'
      ],
      values: req.body
    });
    return;
  } 
  
  var hashedPassword = md5(password)

  if(user.password !== hashedPassword) {
    res.render('auth/login',{
      errors: [
        'Wrong password.'
      ],
      values: req.body
    });
    return;
  }
  res.cookie('userId', user.id);
  res.redirect('/users')
}