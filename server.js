// import express from 'express';
import express from 'express';
import pg from 'pg';

// const { application } = require('express')
// const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Skapa med hjälp av Express.JS och node ett rest-api med följande endpoints:
// o GET /project Listar alla projekt
// o GET /project/:id Hämtar ett specifikt projekt
// o POST /project Lägger in ett nytt project
// o DELETE /project/:id Tar bort ett projekt
// o PUT /project/:id Uppdaterar ett befintligt projekt

app.get('/project', async(req, res) => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'club',
        password: 'changeme',
        port: 5432,
    })
    await client.connect()
    const dbResponse = await client.query('SELECT projekt')
    console.log(dbResponse)
    await client.end()
    dbResponse.send(200);
})

app.get('/project/:projectId', (req, res) => {
    console.log(req)
    res.send(`Hello ${req.query.name}`)
})

app.post('/project', (req, res) => {
    console.log(req)
    res.send(`Hello ${req.query.name}`)
})

app.delete('/project/:projectId', (req, res) => {
    console.log(req)
    res.send(`Hello ${req.query.name}`)
})

app.put('/project/:projectId', (req, res) => {
    console.log(req)
    res.send(`Hello ${req.query.name}`)
})



// 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})