const express = require('express');
const router = express.Router();

//Importar o controlador de Transações
const trasacoesController = require('../controllers/transacoesController');

//Rota para listar todas as transações
router.get('/',trasacoesController.getTransacoes);

//Rota para criar uma noca transação
router.post('/',trasacoesController.createTransacao);

//Rota para listar transações de uma conta específica por ID
router.get('/conta/:id', trasacoesController.getTransacoesPorConta);

//Exportar o Router
module.exports=router;