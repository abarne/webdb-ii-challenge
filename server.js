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

server.get('/cars/:id', (req, res) => {
	const id = req.params.id;

	db('cars')
		.where('id', id)
		.then((car) => {
			res.status(200).json(car);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the car' });
		});
});

server.delete('/cars/:id', (req, res) => {
	const id = req.params.id;

	db('cars')
		.where('id', id)
		.delete()
		.then((response) => {
			res.status(200).json({ message: 'Car deleted successfully' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting the car' });
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

server.put('/cars/:id', (req, res) => {
	const id = req.params.id;
	const newInfo = req.body;
	db('cars')
		.where('id', id)
		.update(newInfo)
		.then((response) => {
			res.status(200).json({ message: 'Car was updated with the following info', info: newInfo });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating car' });
		});
});

module.exports = server;
