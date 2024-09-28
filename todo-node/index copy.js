const Todo = require('./models/Todo'); // Adjust the path as needed
const todoRoutes = require('./routes/todoRoutes');

// Get all todos
exports.listTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ data: todos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, category } = req.body; // Include category
  try {
    const newTodo = new Todo({
      title,
      category, // Add category
      status: false,
    });
    await newTodo.save();
    res.json({ message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  const { _id, title, category } = req.body; // Include category
  try {
    const todo = await Todo.findByIdAndUpdate(
      _id,
      { title, category }, // Update category
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo updated successfully', data: todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await Todo.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
