const express = require('express');
const router = express.Router();

router.get('/', function (request, response) {
    response.send('API Funcionando... ');
});

router.get('/sobre', function (request, response) {
    response.send('Informações sobre API');
});

module.exports = router;