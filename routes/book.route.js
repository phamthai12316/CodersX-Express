var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('books/index',{
    books: db.get('books').value()
  });
});

router.get('/create',(req, res)=>{
  res.render('books/create');
});

router.post('/create',(req, res)=>{
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
})

router.get('/search',(req,res)=>{
  var q = req.query.q;
  var matchedBooks = db.get('books').value().filter(book=>{
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })

  res.render('books/index',{
    books: matchedBooks
  })
})

router.get('/:id',function(req,res){
  var id = req.params.id;
  var book = db.get('books').find({ id: id}).value();
  res.render('books/view',{
    books: book
  })
})

router.get('/:id/delete',function(req,res){
  var id = req.params.id;
  db.get('books').remove({ id: id}).write();
  res.redirect('/books');
})

router.get('/:id/update',function(req,res){
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('books/update',{
    books: book
  })
})

router.post('/:id/update',function(req,res){
  var id = req.params.id;
  db.get('books').find({id : id}).assign({title : req.body.title,description : req.body.description}).write();
  res.redirect('/books');
})

module.exports = router