const express = require ('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//Rotas serão configuradas posteriormente

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server está rodando na porta ${Port}');
})