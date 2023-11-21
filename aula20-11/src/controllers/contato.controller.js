const res = require("express/lib/response");
const connection = require("../configs/mysql.config");


function list(request, response){
  connection.query('SELECT * FROM contatos', function (err, resultado){
    if (err) {
      return response.json({ erro: 'Ocorreram erros ao buscar os dados'});
    }
  return response.json({ resultado});
  });
}

function show(request, response){
  const codigo = request.params.codigo;

  if (codigo == undefined){
    return res.json({ erro: 'Ocorreram erros ao buscar a informação'})
  }

  connection.query(' SELECT * FROM contatos WHERE id = ?', [codigo], function(err, resultado){

    if(err){
      return response.json({ erro: 'Erro ao salvar as informações'});
  }
    if(resultado.length == 0){
      return response.json({ erro: "Código #${codigo} não ecmontrado"});
    }
    return response.json(resultado[0]);
  });
}

function create(request, response){
    const { nome, data, telefone, email } = request.body;

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
  
    connection.query(' INSERT INTO contatos (nome, data_nasc, telefone, email) VALUES (?, ?, ?, ?)', [
      nome, data, telefone, email
    ], function(err, resultado){

      if(err || resultado.affectedRows == 0){
        return response.json({ erro: 'Erro ao salvar as informações'});
      }
      return response.json({ nome, data, telefone, email, id: resultado.insertId});
    });  
}

function update(request, response){
    const codigo = request.params.codigo;

    const { nome, data, telefone, email } = request.body;

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
  
    connection.query ('UPDATE contatos SET nome = ?, data_nasc = ?, telefone = ?, email = ? WHERE id = ?', [
      nome, data, telefone, email, codigo
    ], function( err, resultado) {
      if (err) {
        return response.json({ erro: 'Ocorreu um erro ao tentar atualizar a informação'});
      }

      if (resultado.affectedRows == 0) {
        return response.json({ erro: 'Contato #${codigo} não foi encontrado'});
      }    
  
    return response.json({
      nome,
      data,
      telefone,
      email,
      id: codigo
    });
  });
}

function destroy(request, response){
    const codigo = request.params.codigo;
  
    connection.query('DELETE FROM contatos WHERE id = ?', [codigo], function (err, resultado) {
      if (err) {
        return response.json({ erro: 'Ocorreu um erro ao tentar atualizar a informação'});
      }

      if (resultado.affectedRows == 0) {
        return response.json({ erro: 'Contato #${codigo} não foi encontrado'});
      }

      return response.json({ message: 'Contato #${codigo} excluído com sucesso'});
    });
}

module.exports = { list, show, create, update, destroy};