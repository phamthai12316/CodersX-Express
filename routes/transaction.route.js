var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();


router.get('/', function(req, res){
  res.render('transactions/index',{
    transactions : db.get('transactions').value()
  });
})

router.get('/create', function(req,res){
  res.render('transactions/create',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
})

router.post('/create', function(req, res){
  req.body.id =  shortid.generate();
  db.get('transactions').push(req.body).write();
  res.redirect('/transactions');
})

module.exports = router