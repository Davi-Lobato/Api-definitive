#NOTAS DA AULA

---- 28/08 ----
app.get('path', call back) -> app.get('path', function(request, response){
    return response.alguma coisa
});

npm install --save-dev nodemon => salva as alterações em tempo real da api para que não tenha qeu ficar desligando e ligando novamente pra aplicar as atualizações

"start": "nodemon src/main.js" => adiciona ao arquivo package.json nos scripts para que rode essa linha toda vez que eu startar o programa. !!!!agora utilizar npm start!!!!!! para começar a  api