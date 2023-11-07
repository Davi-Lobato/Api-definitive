//Dados da lista de contatos
const listaContatos = [{
    codigo: 1,
    nome: "Davi",
    data: "2023-16-10",
    telefone: "(69) 98654-2365",
    email: "davi@gmail.com"
  },
  {
    codigo: 2,
    nome: "riam",
    data: "2023-16-10",
    telefone: "(69)98745-2145",
    email: "riam@gmail.org"
  },
  {
    codigo: 3,
    nome: "Aurelios Fornax Magus",
    data: "10025-60-12",
    telefone: "(69)93256-5412",
    email: "aureliosdrag@gmail.com"
  },
  {
    codigo: 4,
    nome: "junior",
    data: "2023-10-16",
    telefone: "(69)94567-3216",
    email: "j@gmail.com"
  }]

function list(request, response){
    return response.json({ dados: listaContatos});
}

function show(request, response){
  const codigo = request.params.codigo;

  let contato = null;
  
  for (const [indice, _contato] of listaContatos.entries()) {
    if (_contato.codigo == codigo) {
      contato = _contato;
    }
  }
  
  if (contato == undefined) {
    return response.json({ erro: `Contato #${codigo} não foi encontrado` });
  }

  return response.json(contato);
}

function create(request, response){
    const nome = request.body.nome;
    const data = request.body.data;
    const telefone = request.body.telefone;
    const email = request.body.email;

    if(nome.length <5 || nome == undefined){
      return response.json({ erro: "Nome inválido"});
    }

    if(!/^\d{4}-\d{2}-\d{2}$/.test(data) || data == undefined){
      return response.json({ erro:"Data invalida" });
    }

    if(!/^\(\d{2}\)\d{4,5}-\d{4}$/.test(telefone)|| telefone == undefined){
      return response.json({erro:"Telefone Invalido"});
    }

    if(!/^.+@.+\..+$/.test(email)|| email == undefined){
      return response.json({erro:"Email Inválido"})
    }
  
    const quantidade = listaContatos.length;
  
    const novoContato = {
      codigo: quantidade + 1,
      nome: nome,
      data: data,
      telefone: telefone,
      email: email,
    };
  
    listaContatos.push(novoContato);
    return response.json(novoContato);
}

function update(request, response){
    const codigo = request.params.codigo;
  
    let contato = null;
  
    for (const [indice, _contato] of listaContatos.entries()) {
      if (_contato.codigo == codigo) {
        contato = _contato;
      }
    }
  
    if (contato == undefined) {
      return response.json({ erro: `Contato #${codigo} não foi encontrado` });
    }
  
    const nome = request.body.nome;
    const data = request.body.data;
    const telefone = request.body.telefone;
    const email = request.body.email;

    if(nome.length <5 || nome == undefined){
      return response.json({ erro: "Nome inválido"});
    }

    if(!/^\d{4}-\d{2}-\d{2}$/.test(data) || data == undefined){
      return response.json({ erro:"Data invalida" });
    }

    if(!/^\(\d{2}\)\d{4,5}-\d{4}$/.test(telefone)|| telefone == undefined){
      return response.json({erro:"Telefone Invalido"});
    }

    if(!/^.+@.+\..+$/.test(email)|| email == undefined){
      return response.json({erro:"Email Inválido"})
    }
  
    contato.nome = nome;
    contato.data = data;
    contato.telefone = telefone;
    contato.email = email;
  
    return response.json(contato);
}



function destroy(request, response){
    const codigo = request.params.codigo;
  
    let contato = null;
  
    for (const [indice, _contato] of listaContatos.entries()) {
      if (_contato.codigo == codigo) {
        contato = _contato;
        listaContatos.splice(indice, 1);
        break;
      }
    }
  
    if (contato == null) {
      return response.json({ erro: `Contato #${codigo} não foi encontrado` });
    }
  
    return response.json(contato);
}

module.exports = { list, create, update, destroy};