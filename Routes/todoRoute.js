const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Model
const Todo = require('../Model/todo');

// get all todos
router.get('/todos', async (req, res) => {
	try {
		const todos = await Todo.find();
		res.send(todos);
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

// post a todo
router.post('/todos', async (req, res) => {
	try {
		const { userEmail, task_name, task_description, deadline, priority } =
			req.body;

		const todo = new Todo({
			userEmail: userEmail,
			task_name: task_name,
			task_description: task_description,
			deadline: deadline,
			priority: priority,
		});
		await todo.save();
		res.send(todo);
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

// Get all matched todos based on speciic userEmail

router.get('/todos/:userEmail', async (req, res) => {
	try {
		const todos = await Todo.find({ userEmail: req.params.userEmail });
		res.send(todos);
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

// delete a specific task
router.delete('/todos/:id', async (req, res) => {
	try {
		const todo = await Todo.findByIdAndDelete(req.params.id);

		res.send('Deleted Successfull');
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

module.exports = router;
