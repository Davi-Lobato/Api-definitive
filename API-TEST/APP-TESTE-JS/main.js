let nome = "Davi";
let idade = 20;
let salario = 2100.12;
let apresentacao = 'Olá '+ nome + ', parabéns pelos seus ' + idade + ' anos. ' + 'Salario = R$ ' + salario;

let informacao = {
    Nome: "Davi", 
    Sobrenome: "Musa Lobato",
    Idade: 20,
    Email: "davimlobato7@gmail.com",
    Salario: 2100.12
};

let apresentacao2 = 'Olá ' + informacao.Nome;

console.log(apresentacao2 + '\n');

informacao.Nome = "Doutrass";

console.log(informacao.Nome + '\n');

