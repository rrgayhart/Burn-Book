const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Burn Book';

app.locals.grudges = [
  {
    id: 1,
    name: 'Chloe',
    deed: 'stinky farts',
    date: 'Thu Feb 23 2017 12:21:11 GMT-0700 (MST)',
    status: false
  },
  {
    id: 2,
    name: 'Sam',
    deed: 'eating the last eggo',
    date: 'Thu Feb 23 2017 12:21:11 GMT-0700 (MST)',
    status: false
  }
]

app.get('/', (request, response) => {
  response.sendfile(__dirname + '/public/index.html')
});

app.get('/api/grudges', (request, response) => {
  response.status(200).json(app.locals.grudges)
});


app.get('/api/grudges/:id', (request, response) => {
  const { id } = request.params;
  const grudge = app.locals.grudges[id]
  if (!grudge) { return response.sendStatus(404); }
  response.json({ id, grudge });
});

app.post('/api/grudges', (request, response) => {
  const grudge = request.body
  app.locals.grudges.push(grudge)
  response.status(200).json(app.locals.grudges)
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});


module.exports = app;
