const express = require('express');
const SalaController = require('../controllers/salaController');

const router = express.Router();

router.get('/', SalaController.listarSalas);
router.get('/:id', SalaController.obterSalaPorId);
router.post('/', SalaController.criarSala);
router.put('/:id', SalaController.atualizarSala);
router.delete('/:id', SalaController.excluirSala);
router.get('/:salaId/poltronas', SalaController.obterPoltronasDaSala);

module.exports = router;