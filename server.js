// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ books: [] })
  .write();

  
var port = 3000;


app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.set('view engine', 'pug');
app.set('views', './views');
// https://expressjs.com/en/starter/basic-routing.html

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/books', (req, res) => {
  res.render('books/index',{
    books: db.get('books').value()
  });
});

app.get('/books/create',(req, res)=>{
  res.render('books/create');
});

app.post('/books/create',(req, res)=>{
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
})

app.get('/books/search',(req,res)=>{
  var q = req.query.q;
  var matchedBooks = db.get('books').value().filter(book=>{
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })

  res.render('books/index',{
    books: matchedBooks
  })
})

app.get('/books/:id',function(req,res){
  var id = req.params.id;
  var book = db.get('books').find({ id: id}).value();
  res.render('books/view',{
    books: book
  })
})

app.get('/books/:id/delete',function(req,res){
  var id = req.params.id;
  db.get('books').remove({ id: id}).write();
  res.redirect('/books');
})

app.get('/books/:id/update',function(req,res){
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('books/update',{
    books: book
  })
})

app.post('/books/:id/update',function(req,res){
  var id = req.params.id;
  db.get('books').find({id : id}).assign({title : req.body.title,description : req.body.description}).write();
  res.redirect('/books');
})

// listen for requests :)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
