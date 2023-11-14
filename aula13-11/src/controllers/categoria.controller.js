const { request } = require("express");

const listaCategorias = [
    { codigo: 1, nome: 'favoritos'},
    { codigo: 2, nome: 'Bloqueados'},
];

function list(request, response){
    return response.json({ dados: listaCategorias});
}

function show(request, response){
    const codigo = parseInt(request.params.codigo);

    const categoria = listaCategorias.find(categoria =>categoria.codigo === codigo);

    if(!categoria){
        return response.status(404).json({ error: "Categoria #${codigo} não encontrada" });
    }

    return response.json(categoria);
}

function create(request, response){
    const {nome} = request.body;
    
    if(nome.length <5 || nome == undefined){
        return response.json({ erro: "Nome inválido"});
    }

    const novaCategoria = { codigo, nome};
    listaCategorias.push(novaCategoria)

    return response.json(novaCategoria);
}

function update(request, response) {
    const codigo = parseInt(request.params.codigo);
    const { nome } = request.body;

    const categoria = listaCategorias.find(categoria => categoria.codigo == codigo);

    if(!categoria){
        return response.status(404).json({ error: "Categoria #${codigo} não encontrada" });
    }

    if(nome.length <3 || nome == undefined){
        return response.json({ erro: "Nome inválido"});
    }

    categoria.nome = nome;

    return response.json(categoria);
}

function destroy(request, response) {
    const codigo = parseInt(request.params.codigo);

    const categoriaindex = listaCategorias.findIndex(categoria => categoria.codigo === codigo);

    if(categoriaindex === -1) {
        return response.status(404).json({ error: 'Categoria #${codigo} não encontrada' });
    }

    const categoriaRemovida = listaCategorias.splice(categoriaindex, 1);

    return response.json(categoriaRemovida);
}

module.exports = { list, show, create, update, destroy};