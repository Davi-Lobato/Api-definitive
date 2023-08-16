function Hipermercado(tipoCarne, quantidadeKg, cartaoAssai) {
    const tabelaPrecos = {
    "fileDuplo": {precoAte5kg: 4.90, precoAcima5kg: 5.80},
    "alcatra": {precoAte5kg: 5.90, precoAcima5kg: 6.80},
    "picanha": {precoAte5kg: 6.90, precoAcima5kg: 7.80}
    }

    let precoTotal = 0;

    if (quantidadeKg <=5){
        precoTotal = tabelaPrecos[tipoCarne].precoAte5kg * quantidadeKg;
    } else {
        precoTotal = tabelaPrecos[tipoCarne].precoAcima5kg * quantidadeKg;
    }

    if (cartaoAssai) {
        novoPrecoTotal = precoTotal * 0.95; //5% de desconto
    }

    console.log("CUPOM FICAL");
    console.log("Tipo da carne: ", tipoCarne);
    console.log("Quantidade em Kg: ", quantidadeKg.toFixed(2), "kg");
    console.log("Preço total: R$", precoTotal.toFixed(2));
    console.log("Tipo de pagamento: ", cartaoAssai ? "Cartão Assai" : "Dinheiro");
    console.log("Valor de desconto: ", cartaoAssai ? "5%" : "Nenhum");
    console.log("Valor a pagar: R$", novoPrecoTotal.toFixed(2));  
}

Hipermercado("alcatra", 20, "S");
module.exports = Hipermercado;