const { request } = require("express");
const connection = require("../configs/mysql.config");

function list(request, response){
    connection.query('SELECT * FROM categorias', function (err, resultado){
        if (err) {
          return response.json({ erro: 'Ocorreram erros ao buscar os dados'});
        }
      return response.json({ resultado });
      });
}

function show(request, response){
    const codigo = request.params.codigo;
  
    if (codigo == undefined){
      return res.json({ erro: 'Ocorreram erros ao buscar a informação'})
    }
  
    connection.query(' SELECT * FROM categorias WHERE id = ?', [codigo], function(err, resultado){
  
      if(err){
        return response.json({ erro: 'Erro ao salvar as informações'});
    }
      if(resultado.length == 0){
        return response.json({ erro: "Código #${codigo} não encontrado"});
      }
      return response.json(resultado[0]);
    });
  }

function create(request, response){
    const {nome} = request.body;
    
    if(nome.length <5 || nome == undefined){
        return response.json({ erro: "Nome inválido"});
    }

    connection.query(' INSERT INTO categorias (nome) VALUES (?)', [
        nome
      ], function(err, resultado){
  
        if(err || resultado.affectedRows == 0){
          return response.json({ erro: 'Erro ao salvar as informações'});
        }
        return response.json({ nome, id: resultado.insertId});
      }
    );  
}

function update(request, response) {
    const {codigo} = request.params.codigo;
    const {nome} = request.body;

    if(nome.length <3 || nome == undefined){
        return response.json({ erro: "Nome inválido"});
    }

    connection.query ('UPDATE categorias SET nome = ? WHERE id = ?', [
      nome, codigo
    ], function( err, resultado) {
        if (err) {
          return response.json({ erro: 'Ocorreu um erro ao tentar atualizar a informação'});
        }
  
        if (resultado.affectedRows == 0) {
          return response.json({ erro: 'Categorias #${codigo} não foi encontrado'});
        }    
    
      return response.json({
        nome,
        id: codigo
      });
    });
}

function destroy(request, response) {
    const codigo = request.params.codigo;
  
    connection.query('DELETE FROM categorias WHERE id = ?', [codigo], function (err, resultado) {
      if (err) {
        return response.json({ erro: 'Ocorreu um erro ao tentar atualizar a informação'});
      }

      if (resultado.affectedRows == 0) {
        return response.json({ erro: 'Contato #${codigo} não foi encontrado'});
      }

      return response.json({ message: 'Categoria #${codigo} excluído com sucesso'});
    });
}

module.exports = { list, show, create, update, destroy};