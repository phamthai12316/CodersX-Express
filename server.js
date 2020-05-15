var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var transactionRoute = require('./routes/transaction.route');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// app.get('/', function(req, res){
//   res.send('<h1>Hello Coders.Tokyo</h1><a href="/users">User list</a>');
// })


app.get('/', function(req, res){
  res.render('index',{
    name: "Thai"
  });
})

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);

app.listen(port, function(){
  console.log('Sever listening on port ' + port)
})