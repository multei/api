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
