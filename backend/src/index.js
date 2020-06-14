const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const classCelebrate = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..','uploads')));

app.use(classCelebrate.errors());

app.listen(3333);

