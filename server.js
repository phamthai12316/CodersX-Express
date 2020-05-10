// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

var todos = [
      {work: "Đi chợ"},{work: "Nấu cơm"},{work: "Rửa bát"},{work: "Học code tại CodersX"}
    ]

app.set('view engine', 'pug');
app.set('views', './views');
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (request, res) => {
  res.render('todos/index',{
    todos: todos
  })
})

app.get('/todos/search',(req, res) => {
  var q = req.query.q;
  var matchedTodo = todos.filter((todo)=>{
    return todo.work.toLowerCase().indexOf(q.toLowerCase()) !== -1
  })
  res.render('todos/index',{
    todos: matchedTodo
  })
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
