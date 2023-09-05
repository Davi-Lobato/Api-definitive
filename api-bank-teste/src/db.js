const sqlite3 = require('sqlite3').verbose();

//Abrir uma conexão com o banco de dados
const db = new sqlite3.Database('./bank.db');

//Criar a tabela de contas (se não existir)
db.run(`CREATE TABLE IF NOT EXISTS contas (
    conta_id INTEGER PRIMARY KEY AUTOINCREMENT,
    conta_usuario TEXT NOT NULL,
    saldo REAL NOT NULL
    )
`);

//Criar a tabela de transações (se não existir)
db.run (`CREATE TABLE IF NOT EXISTS transacoes (
    transacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    conta_origem INT NOT NULL,
    conta_destino INT NOT NULL,
    valor REAL NOT NULL,
    FOREIGN KEY(conta_origem) REFERENCES contas(conta_id),
    FOREIGN KEY(conta_destino) REFERENCES contas(conta_id)
    )
`);

module.exports = db;