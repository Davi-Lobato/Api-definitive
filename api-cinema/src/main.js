const express = require('express');
const clienteRoutes = require('./routes/clienteRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const ingressoRoutes = require('./routes/ingressoRoutes');
const poltronaRoutes = require('./routes/poltronaRoutes');
const salaRoutes = require('./routes/salaRoutes');
const sessaoRoutes = require('./routes/sessaoRoutes');
const filmeRoutes = require('./routes/filmeRoutes');

const app = express();

app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/vendas', vendaRoutes);
app.use('/ingressos', ingressoRoutes);
app.use('/poltronas', poltronaRoutes);
app.use('/salas', salaRoutes);
app.use('/sessoes', sessaoRoutes);
app.use('/filmes', filmeRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server esta rodando na porta: ${port}`);
});