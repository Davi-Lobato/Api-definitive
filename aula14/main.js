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
const CalculaReajuste = require('./CalcularReajuste/ex1');
CalculaReajuste(1500, 0);
console.log("\n-------------------\n");
const CalculaFolhaPagamento = require('./CalculoImposto/ex2');
CalculaFolhaPagamento(5, 220);
console.log("\n-------------------\n");
const numeroDia = require('./NumeroSemana/ex3');
numeroDia(3)
console.log("\n-------------------\n");
const CalcularAbastecimento = require('./Posto/ex4');
CalcularAbastecimento("A", 20);
console.log("\n-------------------\n");
const Hipermercado = require('./Hipermercado/ex5');
Hipermercado("alcatra", 20, "S");
console.log("\n-------------------\n");
// console.log("\n-------------------\n")
// CalculaFolhaPagamento(5, 220)
// console.log("\n-------------------\n")
// numeroDia(3)
// console.log("\n-------------------\n")
// CalculaAbastecimento("G", 20)
// console.log("\n-------------------\n")
// Hipermercado("alcatra", 20, "S")
// console.log("\n-------------------\n")
// console.log("Resumo de atividades");
// console.log("Reajuste Salarial: ", CalculaReajuste(1500, 0));
// console.log("Folha de pagamento: ", CalculaFolhaPagamento(5, 220));
// console.log("Dia de hoje: ", numeroDia(3));
// console.log("Abastecimento: ", CalculaAbastecimento("G", 20));
// console.log(Hipermercado("alcatra", 20, "S"));