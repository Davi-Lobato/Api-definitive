const express = require('express');
const req = require('express/lib/request');

const app = express();


// Importação de arquivos de configurações de rota
const baseRouter = require('./routes/base');
const contatoRouter = require ('./routes/contato');


app.use(express.json());

// Configuração de uso de rotas

app.use(baseRouter);
app.use(contatoRouter);
// Iniciando a aplicação na porta 3000
app.listen(3000, function () {
console.log('API iniciada na porta: 3000');
});