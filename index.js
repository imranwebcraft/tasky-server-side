const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// Routes
const todoRoutes = require('./Routes/todoRoute');

// App variable
const app = express();
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://tasky-c4fd3.web.app',
			'https://tasky-c4fd3.firebaseapp.com',
		],
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Tasky server is running!');
});

app.listen(port, () => {
	console.log(`Tasky Server is running on port ${port}`);
});

// use route
app.use(todoRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
	const error = new Error(`Can't find ${req.originalUrl} on the server`);
	error.status = 404;
	next(error);
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});

// Connect DB

mongoose
	.connect(process.env.DB_LOCATION, { dbName: process.env.DB_NAME })
	.then(() => {
		console.log('DB Connected');
	})
	.catch((err) => console.log(err));
