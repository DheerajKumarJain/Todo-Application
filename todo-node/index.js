const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')
const todoController = require('./controller/todoController');


const app = express()


app.use(cors())
app.use(express.json())

app.use('/api', todoRoutes)

app.get('/api/todo/list', todoController.listTodo);
app.post('/api/todo/create', todoController.createTodo);
app.patch('/api/todo/:_id', todoController.updateTodo);
app.patch('/api/todo/:_id/mark', todoController.markTodo); // Mark as completed
app.delete('/api/todo/delete', todoController.deleteTodo);


mongoose.connect('mongodb://127.0.0.1/todo')

mongoose.connection.on('connected', () => {
  console.log('DB');  

});


app.listen(8000, ()=> {
  console.log('Server running')
})