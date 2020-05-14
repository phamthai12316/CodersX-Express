  // server.js
// where your node app starts

// npm install nodemon

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const shortid = require('shortid');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: []})
  .write()


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (request, res) => {
  res.render('todos/index',{
    todos: db.get('todos').value()
  })
})

app.get('/todos/search',(req, res) => {
  var q = req.query.q;
  var matchedTodo = db.get('todos').value().filter((todo)=>{
    return todo.work.toLowerCase().indexOf(q.toLowerCase()) !== -1
  })
  res.render('todos/index',{
    todos: matchedTodo
  })
})

app.get('/todos/create',(req,res)=>{
  res.render('todos/create');
})

app.post('/todos/create',(req,res)=>{
  req.body.id = shortid.generate();
  db.get('todos').push(req.body).write();
  res.redirect('/todos');
})

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  var todo = db.get('todos').find({id: id}).value();
  console.log(todo);
  res.render('todos/view',{
    todos: todo
  })
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
