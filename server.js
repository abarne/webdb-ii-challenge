const express = require('express');
const knex = require('knex');
const server = express();

const db = knex({
	client: 'sqlite3',
	connection: {
		filename: './data/carsdb.db3'
	},
	useNullAsDefault: true
});

server.use(express.json());

server.get('/', (req, res) => {
	res.send('The server is working');
});

server.get('/cars', (req, res) => {
	db('cars')
		.then((cars) => {
			res.status(200).json(cars);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Failed to retrieve cars' });
		});
});

server.post('/cars', (req, res) => {
	const newCar = req.body;
	db('cars')
		.insert(newCar)
		.then((response) => {
			res.status(200).json({ message: 'Car added', car: newCar });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error adding car' });
		});
});

module.exports = server;
