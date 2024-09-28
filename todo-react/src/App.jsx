import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';

// App Component
const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    listTodos();
  }, []);

  const listTodos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todo/list');
      if (res) {
        setTodos(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/todo/create', { title, category });
      if (res) {
        alert(res.data.message);
        setTitle('');
        setCategory('');
        listTodos();
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const res = await axios.post('http://localhost:8000/api/todo/delete', { _id: id });
        if (res) {
          alert(res.data.message);
          listTodos();
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const editTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:8000/api/todo/${editId}`, { _id: editId, title: editTitle, category: editCategory });
      if (res) {
        setEditId(null);
        setEditTitle('');
        setEditCategory('');
        listTodos();
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const startEditing = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditCategory(todo.category);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditCategory('');
  };

  const markAsCompleted = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/todo/${id}/mark`);
      if (res) {
        listTodos();
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  const randomizeQuote = () => {
    const quotes = [
      "Believe you can and you're halfway there.",
      "You are never too old to set another goal or to dream a new dream.",
      "It does not matter how slowly you go as long as you do not stop.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "The only way to do great work is to love what you do."
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <a href="#" className="navbar-brand">
            <img src="https://cdn-icons-png.flaticon.com/512/6109/6109099.png" alt="Logo" className="logo" />
            ToDoApp
          </a>
          <ul className="navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="content-container">
              <h1 className="header">To-Do List</h1>
              <form onSubmit={createTodo} method="post" className="todo-form">
                <input 
                  className="todo-input"
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Add a new task..."
                  required
                />
                <input 
                  type="text" 
                  className="category-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  required
                />
                <button type="submit" className="submit-button">Add Task</button>
              </form>
              <input 
                type="text" 
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
              />
              <ul className="todo-list">
                {todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase())).map((todo) => (
                  <li key={todo._id} className={`todo-item ${todo.status ? 'completed' : ''}`}>
                    {editId === todo._id ? (
                      <form onSubmit={editTodo} className="edit-form">
                        <input
                          type="text"
                          value={editTitle}
                          placeholder="Task"
                          onChange={(e) => setEditTitle(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          value={editCategory}
                          placeholder="Category"
                          onChange={(e) => setEditCategory(e.target.value)}
                          required
                        />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={cancelEdit}>Cancel</button>
                      </form>
                    ) : (
                      <div className="todo-item-content">
                        <span>{todo.title} - {todo.category}</span>
                        <div className="todo-item-actions">
                          <button onClick={() => startEditing(todo)} className="edit-button">Edit</button>
                          <button onClick={() => markAsCompleted(todo._id)} className="mark-button">Mark</button>
                          <button onClick={() => deleteTodo(todo._id)} className="delete-button">Delete</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
