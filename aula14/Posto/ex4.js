
function CalcularAbastecimento(tipo, litrosVendidos) {
    const precoG = 2.5;
    const precoA = 1.9;
    
    let valorPagar = 0;
    
    if (tipo === "A"){
        if(litrosVendidos <=20){
            valorPagar = litrosVendidos * precoA * 0.97; //3% de desconto
        } else {
            valorPagar = litrosVendidos * precoA * 0.95; //5% de desconto
        }
    } else if (tipo === "G"){
        if(litrosVendidos <=20){
            valorPagar = litrosVendidos = precoG * 0.96; //4% de desconto
        } else {
            valorPagar = litrosVendidos * precoG * 0.94; //6% de desconto
        }
    } else {
        console.log("Tipo de combustível inválido");
    }

    console.log("Valor a ser pago: R$"+valorPagar.toFixed(2));
}

CalcularAbastecimento("A", 20);
module.exports = CalcularAbastecimento;
