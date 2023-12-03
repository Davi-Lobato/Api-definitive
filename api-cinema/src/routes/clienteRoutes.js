const express = require('express');
const ClienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', ClienteController.listarClientes);
router.get('/:id', ClienteController.obterClientePorId);
router.post('/', ClienteController.criarCliente);
router.put('/:id', ClienteController.atualizarCliente);
router.delete('/:id', ClienteController.excluirCliente);
router.get('/clientes/:clienteId/vendas', ClienteController.obterVendasDoCliente);

module.exports = router;