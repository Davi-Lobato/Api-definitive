/*
Arquivo Main para juntar todos os programas feitos na aula 04/08

Método:
No aqruivo alvo{
    module.exports = "nome da função a ser copiada"
}
No aquivo main{
    const "varivel" = require('caminho do arquivo')
}
*/

const CalculaReajuste = require('./CalcularReajuste');
const CalculaFolhaPagamento = require('./CalculoImposto');
const numeroDia = require('./NumeroSemana');
const CalculaAbastecimento = require('./Posto');
const Hipermercado = require('./Hipermercado');
CalculaReajuste(1500, 0)
CalculaFolhaPagamento(5, 220)
numeroDia(3)
CalculaAbastecimento("G", 20)
Hipermercado("alcatra", 20, "S")
// console.log("Resumo de atividades");
// console.log("Reajuste Salarial: ", CalculaReajuste(1500, 0));
// console.log("Folha de pagamento: ", CalculaFolhaPagamento(5, 220));
// console.log("Dia de hoje: ", numeroDia(3));
// console.log("Abastecimento: ", CalculaAbastecimento("G", 20));
// console.log(Hipermercado("alcatra", 20, "S"));

