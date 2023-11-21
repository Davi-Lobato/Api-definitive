const express = require('express');
const categoriaController = require('../controllers/categoria.controller');

const router = express.Router();

router.get('/categorias', categoriaController.list);
router.get('/categorias/:codigo', categoriaController.show);
router.post('/categorias', categoriaController.create);
router.put('/categorias/:codigo', categoriaController.update);
router.delete('/categorias/:codigo', categoriaController.destroy);

module.exports = router;