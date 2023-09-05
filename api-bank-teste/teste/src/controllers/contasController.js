const Conta = require('../models/contaModelo');

let contas = [];

//Retorna todas as contas
function getContas(req, res) {
    res.json(contas);
}

//Crie uma nova conta
function createContas(req, res){
    const { contaUsuario, saldo } = req.body;

    //Simples valdiação dos campos
    if(!contaUsuario || !saldo) {
        return res.status(400).json({ message: 'Campos de usuario e saldo são obrigatórios'})
    }
    const contaId = contas.length + 1;
    const conta = new Conta(contaId, contaUsuario, saldo);
    contas.push(conta);

    res.status(201).json(conta);
}

//Atualiza uma conta exitente por ID
function updateConta(req, res) {
    const contaId = parseInt(req.params.id);
    const { contaUsuario, saldo } = req.body;
    
    //encontre o ID
    const conta = contas.find((con) => con.contaId === contaId);
    if(!conta) {
        return res.status(404).json({ message: 'Conta não encontrada'});
    }
}