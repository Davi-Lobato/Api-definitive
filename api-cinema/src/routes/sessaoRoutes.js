const express = require('express');
const SessaoController = require('../controllers/sessaoController');

const router = express.Router();

router.get('/', SessaoController.listarSessoes);
router.get('/:id', SessaoController.obterSessaoPorId);
router.post('/', SessaoController.criarSessao);
router.put('/:id', SessaoController.atualizarSessao);
router.delete('/:id', SessaoController.excluirSessao);

module.exports = router;