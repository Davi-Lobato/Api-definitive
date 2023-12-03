const db = require('../config/db');
const Joi = require('joi');

class ClienteController {

    static async validarCliente(cliente) {
        const schema = Joi.object({
            cpf: Joi.string().required(),
            rg: Joi.string().required(),
            contato: Joi.string().required(),
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            endereco: Joi.string().required(),
        });
    
        return schema.validateAsync(cliente);
    }

    static listarClientes(req, res) {
        const sql = 'SELECT * FROM cliente';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Erro ao obter clientes:', err.message);
                res.status(500).json({ error: 'Erro interno no servidor' });
            } else {
                res.json(result);
            }
        });
    }

    static obterClientePorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM cliente WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao obter cliente por ID:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result[0]);
            }
        });
    }

    static async criarCliente(req, res) {
        try {
            const cliente = req.body;
            await ClienteController.validarCliente(cliente);
            const { cpf, rg, contato, nome, email, endereco } = req.body;
            const sql = 'INSERT INTO cliente (cpf, rg, contato, nome, email, endereco) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(sql, [cpf, rg, contato, nome, email, endereco], (err, result) => {
                if (err) {
                    console.error('Erro ao criar cliente:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ message: 'Cliente criado com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static async atualizarCliente(req, res) {
        try {
            const cliente = req.body;
            await ClienteController.validarCliente(cliente);
            const { id } = req.params;
            const { cpf, rg, contato, nome, email, endereco } = req.body;
            const sql = 'UPDATE cliente SET cpf = ?, rg = ?, contato = ?, nome = ?, email = ?, endereco = ? WHERE id = ?';
            db.query(sql, [cpf, rg, contato, nome, email, endereco, id], (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar cliente:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ message: 'Cliente atualizado com sucesso' });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirCliente(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM cliente WHERE id = ?';
        db.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao excluir cliente:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ message: 'Cliente excluído com sucesso' });
            }
        });
    }

    static obterVendasDoCliente(req, res) {
        const { clienteId } = req.params;
        const sql = 'SELECT * FROM venda WHERE cliente_id = ?';
        db.query(sql, [clienteId], (err, result) => {
            if (err) {
                console.error('Erro ao obter vendas do cliente:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }
}

module.exports = ClienteController;