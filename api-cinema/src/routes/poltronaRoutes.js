const express = require('express');
const PoltronaController = require('../controllers/poltronaController');

const router = express.Router();

router.get('/', PoltronaController.listarPoltronas);
router.get('/:id', PoltronaController.obterPoltronaPorId);
router.post('/', PoltronaController.criarPoltrona);
router.put('/:id', PoltronaController.atualizarPoltrona);
router.delete('/:id', PoltronaController.excluirPoltrona);

module.exports = router;