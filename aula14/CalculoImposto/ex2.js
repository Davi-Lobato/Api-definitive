function CalculaFolhaPagamento(hora, valorHora){
    const salarioBruto = hora * valorHora
    let descontoIR = 0

    if (salarioBruto > 900 && salarioBruto <= 1500){
        descontoIR = 0.05;
    } else if (salarioBruto > 1500 && salarioBruto <= 2500){
        descontoIR = 0.1;
    } else if (salarioBruto > 2500){
        descontoIR = 0.2;
    }

    const descontoINSS = 0.1 * salarioBruto;
    const descontoFGTS = 0.11 * salarioBruto;
    const totalDescontos = descontoIR * salarioBruto + descontoINSS;
    const salarioLiquido = salarioBruto - totalDescontos;

    console.log("Salário Bruto: R$"+salarioBruto.toFixed(2));
    console.log("(-) IR ("+(descontoIR*100)+"%): R$"+(descontoIR*salarioBruto).toFixed(2));
    console.log("(-) INSS ( 10%): R$"+descontoINSS.toFixed(2));
    console.log("FGTS (11%): R$"+descontoFGTS.toFixed(2));
    console.log("Total de descontos: R$"+totalDescontos.toFixed(2));
    console.log("Salário Liquido: R$"+salarioLiquido.toFixed(2));
}

// const hora = 5;
// const valorHora = 220;
// CalculaFolhaPagamento(hora, valorHora);
module.exports = CalculaFolhaPagamento;