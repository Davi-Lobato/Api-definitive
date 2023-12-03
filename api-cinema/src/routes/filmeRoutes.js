const express = require('express');
const FilmeController = require('../controllers/filmeController');

const router = express.Router();

router.get('/', FilmeController.listarFilmes);
router.get('/:id', FilmeController.obterFilmePorId);
router.post('/', FilmeController.criarFilme);
router.put('/:id', FilmeController.atualizarFilme);
router.delete('/:id', FilmeController.excluirFilme);
router.get('/:filmeId/sessoes', FilmeController.obterSessoesDoFilme);

module.exports = router;