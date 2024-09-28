const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

router.get('/todo/list', todoController.listTodo);
router.post('/todo/create', todoController.createTodo);
router.patch('/todo/:_id', todoController.updateTodo);
router.patch('/todo/:_id/mark', todoController.markTodo); // Mark as completed
router.delete('/todo/delete', todoController.deleteTodo);

module.exports = router;
