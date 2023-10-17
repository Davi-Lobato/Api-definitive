const express = require('express');
const req = require('express/lib/request');

const app = express();
app.use(express.json());

// Rota principal
app.get('/', function (request, response) {
  response.send('API Funcionando... ');
});

const listaContatos = [{
  codigo: 1,
  nome: "Davi",
  data: "2023-16-10",
  telefone: "(69) 98654-2365",
  email: "davi@gmail.com"
},
{
  codigo: 2,
  nome: "riam",
  data: "2023-16-10",
  telefone: "(69)98745-2145",
  email: "riam@gmail.org"
},
{
  codigo: 3,
  nome: "Aurelios Fornax Magus",
  data: "10025-60-12",
  telefone: "(69)93256-5412",
  email: "aureliosdrag@gmail.com"
},
{
  codigo: 4,
  nome: "junior",
  data: "2023-10-16",
  telefone: "(69)94567-3216",
  email: "j@gmail.com"
}]

// Listar todos os contatos
app.get('/contatos', function (request, response){
  return response.json({ dados: listaContatos});
})

// Criar um novo contato
app.post('/contatos', function(request, response){
  const nome = request.body.nome;
  const data = request.body.data;
  const telefone = request.body.telefone;
  const email = request.body.email;

  const quantidade = listaContatos.length;

  const novoContato = {
    codigo: quantidade + 1,
    nome: nome,
    data: data,
    telefone: telefone,
    email: email,
  };

  listaContatos.push(novoContato);
  return response.json(novoContato);
});

// Editar um contato
app.put('/contatos/:codigo', function(request, response){
  const codigo = parseInt(request.params.codigo);
  const { nome, data, telefone, email} = request.body;

  app.get('/contatos/${codigo}'), function(request, response){
    if (err){
      return response.status(500).json({ message: 'não encontrado' });
    }
  }

  const editarContato = {
    nome: nome || nome,
    data: data || data,
    telefone: telefone || telefone,
    email: email || email
  }

  return response.json(editarContato);

  // return response.send('Atualizar o contato Código: ${codigo}');
});

// Excluir/remover um contato
app.delete('/contatos/codigo:', function(request, response){
  const codigo = request.params.codigo;

  return response.send('Remover o contato código: ${codigo}');
})

app.get('/sobre', function (request, response) {
  response.send('Informações sobre API');
});

// Iniciando a aplicação na porta 3000
app.listen(3000, function () {
console.log('API iniciada na porta: 3000');
});