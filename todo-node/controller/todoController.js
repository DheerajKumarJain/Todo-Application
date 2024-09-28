const Todo = require('../models/Todo');// Correct path to Todo model


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
  const { title, category } = req.body;
  try {
    const newTodo = new Todo({
      title,
      category,
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
  const { _id, title, category } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      _id,
      { title, category },
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

// Mark a todo as completed
exports.markTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    const todo = await Todo.findByIdAndUpdate(
      _id,
      { status: true }, // Mark as completed
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo marked as completed', data: todo });
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

//   try {

//     const todo = await Todo.findByIdAndDelete({
//        _id: req.body._id
//     })

//     res.json({
//         status: 200,
//         message: "Successfully! Todo Deleted"
//     })

// } catch(e) {
//     console.log(e)

//     res.json({
//         status: 500,
//         error: "Internal Server Error"
//     })
// }

}
