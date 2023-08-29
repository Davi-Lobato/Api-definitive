const express = require("express");

const app = express();

// Rota principal
app.get('/', function(request, response){
    return response.json({ mensagem: "API funcionando..."});
});

// Rota autor
app.get('/sobre', function(request, response){
    const info = {
        Autor: 'Davi Lobato',
        Email: 'davimlobato@hotmail.com',
        Telefone: '(69)6666-9999'
    }

    console.log(info);
    return response.json(info);
});

// Iniciando a aplicação na porta 3000
app.listen(3000, function(){
    console.log('API iniciada na porta: 3000')
});