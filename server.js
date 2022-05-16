// import express from 'express';
import express from 'express';
import pg from 'pg';
// import pg from 'pg';

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

app.get('/hello', (req, res) => {
    // console.log(req)
    res.send(`Hello ${req.query.name}`)
})

app.get('/project', async(req, res) => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'changeme',
        port: 5432,
        // 2:51:00 förklarar hur man får bort detta och lägger i enviroment variabler ist
    })
    await client.connect()
    const dbResponse = await client.query('SELECT projektkod, projektnamn, projektledar_id, projektbudget FROM public.projekt;')
    console.log(dbResponse)
    await client.end()
    res.json(dbResponse.rows);
})

app.get('/project/:projectId', async(req, res) => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'changeme',
        port: 5432,
    });
    await client.connect();
    const dbResponse = await client.query('SELECT projektkod, projektnamn, projektledar_id, projektbudget FROM public.projekt WHERE projektkod=$1;', [req.params.projectId])
    console.log(dbResponse)
    await client.end()
    res.json(dbResponse.rows);

})

app.post('/project', async(req, res) => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'changeme',
        port: 5432,
    });
    await client.connect();
    const dbResponse = await client.query('INSERT INTO public.projekt ("projektkod", "projektnamn", "projektledar_id", "projektbudget") VALUES ($1, $2, $3, $4);', [req.body.projektkod, req.body.projektnamn, req.body.projektledar_id, req.body.projektbudget])
    console.log(req.body)
    await client.end()
    res.json(dbResponse.rows);

})

app.delete('/project/:deleteId', async(req, res) => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'changeme',
        port: 5432,
    });
    await client.connect();
    const dbResponse = await client.query('DELETE FROM public.projekt WHERE projektkod=$1;', [req.params.deleteId])
    console.log(dbResponse)
    await client.end()
    res.json(dbResponse.rows);

})

app.put('/project/:updateId', async(req, res) => {
    // console.log(req)
    // res.send(`Hello ${req.params.id}`)
    // res.json(dbResponse.rows);
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'changeme',
        port: 5432,
    });
    await client.connect();
    const dbResponse = await client.query('UPDATE public.projekt SET projektnamn=$2, projektledar_id=$3, projektbudget=$4 WHERE projektkod=$1;', [req.params.updateId, req.body.projektnamn, req.body.projektledar_id, req.body.projektbudget])
    console.log(dbResponse)
    await client.end()
    res.json(dbResponse.rows);

})


// 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})