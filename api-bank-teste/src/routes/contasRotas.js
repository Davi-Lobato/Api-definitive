const express = require('express');
const router = express.Router();

//Importar o controlador da contas
const contaController = require('../controllers/contasController');

//Rota para listar todas as contas
router.get('/', contaController.getContas);

//Rota par criar uma conta
router.post('/', contaController.createContas);

//Rota para atualizar uma conta por ID
router.put('/:id', contaController.uptadeContas);

//Rota para exluir uma conta por ID
router.delete('/:id', contaController.deleteConta)

//Exoprtar o router
module.exports = router;

// PRIMEIRA TENTATIVA DAS ROTAS
/*

let contas = [];// Simulando um banco de dados em memória

//Rota para criar uma nova conta
router.post('/', (req, res) => {
    const { contaUsuario, saldo } = req.body;
    const novaConta = { id: contas.length + 1, contaUsuario, saldo};
    contas.push(novaConta);
    res.status(200).json(contas);
});

//Rota para listar todas as contas
router.get('/', (req, res) => {
    res.status(200).json(contas);
});

//Rota para obter uma conta por ID
router.get('/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const conta = contas.find(con => con.id === id);
    if(!conta){
        return res.status(404).json({ message: 'Conta não encontrada'});
    }
    res.status(200).json(conta);
});

//Rota para visualizar o saldo de uma conta
router.get('/:saldo', (req, res) =>{
    const id = parseInt(req.params.saldo);
    const { saldo } = req.body;
    const conta = contas.find(con => con.id === id);
    if (!conta){
        return res.status(404).json({ message: 'Conta não encontrada'});
    }
    conta.saldo = saldo;
    res.status(200).json(conta);
});

//Rota para excluir uma conta
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    contas = contas.filter(con => contas.id !== id);
    res.status(200).send();
})

module.exports = router//Exportar para ser utilizada na main
*/