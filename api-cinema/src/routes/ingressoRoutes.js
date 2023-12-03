const express = require('express');
const IngressoController = require('../controllers/ingressoController');

const router = express.Router();

router.get('/', IngressoController.listarIngressos);
router.get('/:id', IngressoController.obterIngressoPorId);
router.post('/', IngressoController.criarIngresso);
router.put('/:id', IngressoController.atualizarIngresso);
router.delete('/:id', IngressoController.excluirIngresso);

module.exports = router;