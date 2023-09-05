const express = require('express');

const app = express();

const port = 3000;

//Rotas para gerenciar suas conas bancárias.
const contasRotas = require('./contasRotas');
const transacoesRotas = require('./transacoesRotas');

app.use('/contas', contasRotas);
app.use('/transacoes', transacoesRotas);

app.listen(port, ()=> {
    console.log('Servidor rodando na porta ${port}');
});
