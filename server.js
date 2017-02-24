'use strict'
const http = require('http')
const express = require('express');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Burn Book';

app.use(express.static(path.join(__dirname, '/public')));

const port = process.env.PORT || 3000;
const server = http.createServer(app)
  .listen(port, () => {
    console.log(`Listening on port ${port}.`)
  });

app.locals.grudges = [
  {
    id: 1,
    name: 'Chloe',
    offense: 'stinky farts',
    date: 'Thu Feb 23 2017 12:21:11 GMT-0700 (MST)',
    status: false
  },
  {
    id: 2,
    name: 'Sam',
    offense: 'eating the last eggo',
    date: 'Thu Feb 23 2017 12:21:11 GMT-0700 (MST)',
    status: true
  }
]

app.get('/', (request, response) => {
  response.sendfile(__dirname + '/public/index.html')
});

app.get('/api/grudges', (request, response) => {
  response.status(200).json(app.locals.grudges);
});


app.get('/api/grudges/:id', (request, response) => {
  const { id } = request.params;
  const grudge = app.locals.grudges[id]
  if (!grudge) { return response.sendStatus(404); }
  response.json({ id, grudge });
});

app.post('/api/grudges', (request, response) => {
  const grudge = request.body;
  app.locals.grudges.push(grudge);
  response.status(200).json(app.locals.grudges);
});

app.put('/api/grudges/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const grudge = app.locals.grudges[id]
  if (!grudge) { return response.sendStatus(404); }

  const updateGrudges = app.locals.grudges.map(grudge => {
    if(grudge.id === parseInt(id)) grudge.status = true
    return grudge
  })

  app.locals.grudges = updateGrudges
  res.status(200).json(app.locals.grudges)
})

module.exports = app;
