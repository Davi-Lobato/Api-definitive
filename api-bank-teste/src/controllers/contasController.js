const Conta = require('../models/contaModelo');
const db = require('../db');

let contas = [];

//Retorna todas as contas
function getContas(req, res) {
    db.all('SELECT * FROM contas', (err, rows) => {
        if (err){
            res.status(500).json({ error: 'Falha ao consultar a tabela de contas'});
        }
        res.json(rows);
    });
}

//Crie uma nova conta
function createContas(req, res){
    const { contaUsuario, saldo } = req.body;

    //Simples valdiação dos campos
    if(!contaUsuario || !saldo) {
        return res.status(400).json({ message: 'Campos de usuario e saldo são obrigatórios'})
    }

    db.run('INSERT INTO contas (conta_usuario, saldo) VALUES (?, ?)', [contaUsuario, saldo], function (err){
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar conta.'});
        }
        res.status(201).json({ contaId: this.lastID});
    });
}

//Atualiza uma conta exitente por ID
function updateConta(req, res) {
    const contaId = parseInt(req.params.id);
    const { contaUsuario, saldo } = req.body;
    
    //encontre o ID
    db.get('SELECT * FROM contas WHERE conta_id = ?', [contaId], (err, row) => {
        if (err){
            return res.status(500).json({ message: 'Erro ao buscar a cotna.'});
            }
        if (!row){
            return  res.status(404).json({message:'Nenhuma conta encontrada com esse id!'})
        }

        //Atualize os campos da conta
        const updateConta = {
            conta_usuario: contaUsuario || row.conta_ususario,
            saldo: saldo || row.saldo,
        };

        db.run('UPDATE contas SET conta_usuario = ?, saldo = ? WHERE conta_id = ?', [
            updateConta.conta_usuario,
            updateConta.saldo,
            updateConta.conta_id
        ], (err) => {
            if (err){
                return res.status(500).json({ message: 'Erro ao utilizar a conta'});            
            }
                res.json(updateConta);
        });
    });
}

//Excluir uma conta por ID
function deleteConta(req, res){
    const id = parseInt(req.params.id);

    const contaIndex = contas.findIndex((con) => con.contaId === contaId);
    if(contaIndex === -1){
        return res.status(404).json({message:'ID inválido.'});
    }

    contas.splice(contaIndex, 1);

    res.json({ message: 'Conta excluida com sucesso.'});
}

//Exportar os métodos relevantes
module.export = {
    getContas,
    createContas,
    updateConta,
    deleteConta,
};