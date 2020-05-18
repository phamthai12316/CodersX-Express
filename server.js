var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var transactionRoute = require('./routes/transaction.route');

var cookie = require('./middlewares/cookie.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cookieParser())

app.use(express.static('public')) 
// app.get('/', function(req, res){
//   res.send('<h1>Hello Coders.Tokyo</h1><a href="/users">User list</a>');
// })

app.get('/', (req, res) => {
  res.cookie("cookie-id", 12345);
  res.render('index',{
    name: "Thai"
  });
})

app.use(cookie.cookie);
app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);

app.listen(port, function(){
  console.log('Sever listening on port ' + port)
})