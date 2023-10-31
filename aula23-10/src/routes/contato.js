const express = require('express');

const contatoController = require('../controllers/contato.controller');

const router = express.Router();
  
  router.get('/contatos', contatoController.list);
  router.post('/contatos', contatoController.create);
  router.put('/contatos/:codigo', contatoController.update); 
  router.delete('/contatos/:codigo', contatoController.destroy);

  module.exports = router;