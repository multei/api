const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.get('/db', async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM test_table')
        const results = { 'results': (result) ? result.rows : null };
        res.send(results)
        client.release()
    } catch (err) {
        console.error(err)
        res.send("Error " + err)
    }
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
