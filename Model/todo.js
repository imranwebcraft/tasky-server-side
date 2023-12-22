const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	userEmail: {
		type: String,
		required: true,
	},
	task_name: {
		type: String,
		required: true,
	},
	task_description: {
		type: String,
		required: true,
	},
	deadline: {
		type: Date,
		default: Date.now,
	},
	priority: {
		type: String,
		required: true,
	},
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
