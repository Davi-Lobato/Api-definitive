class Transacao{
    constructor(transacaoId, origemContaId, destinoContaId, quantidade){
        this.destinoContaId = destinoContaId;
        this.origemContaId = origemContaId;
        this.transacaoId = transacaoId;
        this.quantidade = qauntidade;
    }
}

module.exports = Transacao;