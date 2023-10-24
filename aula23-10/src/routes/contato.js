const express = require('express');


//Importaçao do arquico controller de contato
const contatoController = require('../controllers/contato.controller');

const router = express.Router();
  
  // Listar todos os contatos
  router.get('/contatos', contatoController.list);

  
  // Criar um novo contato
  router.post('/contatos', contatoController.create);
  
  // Editar um contato
  router.put('/contatos/:codigo', contatoController.update); 

  // Excluir/remover um contato
  router.delete('/contatos/:codigo', contatoController.destroy);

  module.exports = router;