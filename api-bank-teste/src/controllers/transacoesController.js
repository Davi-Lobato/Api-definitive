const Transacao = require('../models/transacoesModelo');
const Conta = require('../models/contaModelo');

let transacoes = [];

//Retorna todas as transações
function getTransacoes(req, res) {
    db.all('SELECT * FROM transacoes', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar transações'})
        }
        res,json(rows);
    });
}

//Cria uma nova transação
function createTransacoes(req, res) {
    const { origemContaId, destinoContaId, quantidade } = req.body;
    
    //Simples validação dos campos
    if(!origemContaId || !destinoContaId || !quantidade){
        return res.status(400).json({ message: 'Campos de origem da conta, destino e quantidade não encontrados.'});
    }

    //Verificar se as contas de origem e destino existem
    db.get('SELECT * FROM contas WHERE conta_id = ?', [origemContaId], (err, origemConta) => {
        if (err) {
            return res.status(500).json({ message: 'Erro buscar conta de origem'});
        }
        if (!origemConta) {
            return res.status(404).json({ message: 'Conta de origem não encontrada'});
        }

        db.get('SELECT * FROM contas WHERE conta_id =?', [destinoContaId], (err, destinoConta) =>{
            if (err) {
                return res.status(500).json({message:'Erro buscando a conta de destino'});
            }
            if (!destinoConta)  {
                return res.status(404).json({message:"Conta de destino não encontrada"});
            }

            //Verificar se há saldo suficiente na conta de origem
            if(origemConta.saldo < quantidade) {
                return res.status(400).json({ message: 'Saldo insuficiente na conta'});
            }

            //Criar a transação e atualize os saldos da contas
            db.run('INSERT INTO transacoes (origem_conta_id, destino_conta_id, quantidade VALUES (?, ?, ?)', [
                origemContaId,
                destinoContaId,
                quantidade,
            ], function (err){
                if (err) {
                    return res.status(500).json({ message: 'Erro ao criar a transação'});
                }
                const transacaoId = this.lastID;
            
                origemConta.saldo -= quantidade;
                destinoConta.saldo += quantidade;
            
                res.status(201),json({ transacaoId });

            });
        });
    });
}

//Lista transações de uma conta especifica por ID
function getTransacoesPorConta(req, res) {
    const contaId = parseInt(req.params.id);

    const contaTransacoes = transacoes.filter(
        (transacao) => transacao.origemContaId === contaId || transacao.destinoContaId === contaId
    );
    res.json(contaTransacoes);
}

//exporte is métodos relevantes
module.export = {
    getTransacoes,
    createTransacoes,
    getTransacoesPorConta,
};