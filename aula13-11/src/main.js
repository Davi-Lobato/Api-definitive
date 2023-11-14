const express = require('express');
const req = require('express/lib/request');

const app = express();

const baseRouter = require('./routes/base');
const contatoRouter = require('./routes/contato');
const categoriaRouter = require('./routes/categoria');


app.use(express.json());


app.use(baseRouter);
app.use(contatoRouter);
app.use(categoriaRouter);

app.listen(3000, function () {
console.log('API iniciada na porta: 3000');
});