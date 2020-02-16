require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const knex = require('./src/knex');

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.get('/parkings', async (req, res) => {
  knex.select('id', 'uuid', 'car_color', 'car_make_model', 'car_model', 'car_plate', 'coordinates').from;

  try {
    const { pool } = require('./src/pool');
    const client = await pool.connect();
    const result = await client.query('SELECT id, uuid, car_color, car_make_model, car_model, car_plate, coordinates FROM parkings WHERE 1=1');
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.get('/parkings/:id', async (req, res) => {
  res.send(req.params.id);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
