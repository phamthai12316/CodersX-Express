var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();


router.get('/', function(req, res){
  res.render('users/index',{
    users : db.get('users').value()
  });
})

router.get('/search', function(req,res){
  var q = req.query.q;
  var matchedUsers =  db.get('users').value().filter(function(user){
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index',{
    users: matchedUsers
  })
})

router.get('/create', function(req,res){
  res.render('users/create')
})

router.post('/create',function(req,res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users')
})

router.get('/:id',function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/view',{
    users: user
  })
})

router.get('/:id/delete', function(req,res){
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
})


router.get('/:id/update', function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/update',{
    users:user
  })
})

router.post('/:id/update', function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id : id}).assign({name : req.body.name}).write();
  res.redirect('/users');
})

module.exports = router