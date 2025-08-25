const express = require('express');
const cors = require('cors');
const { employees, shifts } = require('./data');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/shifts', (req, res) => {
  res.json(shifts);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
