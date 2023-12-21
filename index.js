const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// App variable
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Tasky server is running!');
});

app.listen(port, () => {
	console.log(`Tasky Server is running on port ${port}`);
});

// Connect DB

mongoose
	.connect(process.env.DB_LOCATION)
	.then(() => {
		console.log('DB Connected');
	})
	.catch((err) => console.log(err));
