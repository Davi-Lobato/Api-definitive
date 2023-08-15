function CalculaReajuste(salario, reajuste){
    let percentual;
    let aumento;

    if (salario <=280){
        percentual = 20;
    } else if (salario <=700){
        percentual = 15;
    } else if (salario <=1500){
        percentual = 10;
    } else {
        percentual = 5;
    }

    aumento = salario *(percentual/100);
    novoSalario = salario + aumento;

    console.log("O salário antes do reajuste: R$"+salario);
    console.log("O percentual de aumento aplicado: "+percentual);
    console.log("O valor do aumento: R$"+aumento);
    console.log("O novo salário, após o aumento: R$"+ novoSalario);
}

const salarioAtual = 200;
CalculaReajuste(salarioAtual, 0);