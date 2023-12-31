const express = require ('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//Rotas serão configuradas posteriormente

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server está rodando na porta ${Port}');
})

const contaRotas = require('./routes/contasRotas');
const transacaoRotas = require('./routes/transacoesRotas');

//Configurar as rotas
app.use('/api/contas', contaRotas);
app.use('/api/transacoes', transacaoRotas);