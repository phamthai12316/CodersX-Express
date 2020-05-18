var db = require('../db');
var shortid = require('shortid');


module.exports.index = (req, res) => {
  var user = db.get('users').value();
  res.render('users/index',{
    users : user
  });
}
module.exports.search = (req,res) => {
  var q = req.query.q;
  var matchedUsers =  db.get('users').value().filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index',{
    users: matchedUsers
  })
}
module.exports.create = (req,res) => {
  res.render('users/create')
}
module.exports.postCreate = (req,res) => {
  req.body.id = shortid.generate();
  var errors = [];
  if(!req.body.name){
    errors.push('Please enter name');
  }
  if(req.body.name.length > 30){
    errors.push('Character limit 30');
  } 
  if(errors.length){
    res.render('users/create',{
      errors:errors,
      values: req.body
    });
    return;
  }
    db.get('users').push(req.body).write();
    res.redirect('/users')
}
module.exports.view = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/view',{
    users: user
  })
}
module.exports.delete = (req,res) => {
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
}
module.exports.update = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/update',{
    users:user
  })
}
module.exports.postUpdate = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).assign({name : req.body.name}).write();
  res.redirect('/users');
}