const db = require('../config/db');
const Joi = require('joi');

class VendaController {

    static async validarVenda(venda) {
        const schema = Joi.object({
            valor: Joi.number().required(),
            data_hora: Joi.string().isoDate().required(),
            forma_pagamento: Joi.string().required(),
            cliente_id: Joi.number().required(),
            ingresso_id: Joi.number().required(),
            });
    
        return schema.validateAsync(venda);
    }

    static listarVendas(req, res) {
        const sql = 'SELECT * FROM venda';
        db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao obter vendas:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json(result);
        }
        });
    }

    static obterVendaPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM venda WHERE id = ?';
        db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao obter venda por ID:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json(result[0]);
        }
        });
    }

    static async criarVenda(req, res) {
        try {
            const venda = req.body;
            await VendaController.validarVenda(venda);
            const { valor, data_hora, forma_pagamento, cliente_id, ingresso_id } = req.body;
            const sql = 'INSERT INTO venda (valor, data_hora, forma_pagamento, cliente_id, ingresso_id) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [valor, data_hora, forma_pagamento, cliente_id, ingresso_id], (err, result) => {
                if (err) {
                    console.error('Erro ao criar venda:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Venda criada com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
        
    }

    static async atualizarVenda(req, res) {
        try {
            const venda = req.body;
            await VendaController.validarVenda(venda);
            const { id } = req.params;
            const { valor, data_hora, forma_pagamento, cliente_id, ingresso_id } = req.body;
            const sql = 'UPDATE venda SET valor = ?, data_hora = ?, forma_pagamento = ?, cliente_id = ?, ingresso_id = ? WHERE id = ?';
            db.query(sql, [valor, data_hora, forma_pagamento, cliente_id, ingresso_id, id], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar venda:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ mensagem: 'Venda atualizada com sucesso' });
            }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirVenda(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM venda WHERE id = ?';
        db.query(sql, [id], (err) => {
        if (err) {
            console.error('Erro ao excluir venda:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json({ mensagem: 'Venda excluída com sucesso' });
        }
        });
    }
}

module.exports = VendaController;