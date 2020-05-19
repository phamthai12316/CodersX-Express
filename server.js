var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var authRoute = require('./routes/auth.route');
var transactionRoute = require('./routes/transaction.route');

var authMiddleware = require('./middlewares/auth.middleware');

// var cookie = require('./middlewares/cookie.middleware');

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
  res.render('index',{
    name: "Thai"
  });
})

// app.use(cookie.cookie);
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/books',authMiddleware.requireAuth, bookRoute);
app.use('/transactions',authMiddleware.requireAuth, transactionRoute);
app.use('/auth', authRoute);


app.listen(port, function(){
  console.log('Sever listening on port ' + port)
})