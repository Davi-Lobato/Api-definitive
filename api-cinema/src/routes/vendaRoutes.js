const express = require('express');
const VendaController = require('../controllers/vendaController');

const router = express.Router();

router.get('/', VendaController.listarVendas);
router.get('/:id', VendaController.obterVendaPorId);
router.post('/', VendaController.criarVenda);
router.put('/:id', VendaController.atualizarVenda);
router.delete('/:id', VendaController.excluirVenda);

module.exports = router;