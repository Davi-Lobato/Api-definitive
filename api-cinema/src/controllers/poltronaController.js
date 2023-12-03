const db = require('../config/db');
const Joi = require('joi');

class PoltronaController {

    static async validarPoltrona(poltrona) {
        const schema = Joi.object({
            numero: Joi.number().required(),
            fileira: Joi.string().required(),
            status: Joi.string().required(),
        });
    
        return schema.validateAsync(poltrona);
    }

    static listarPoltronas(req, res) {
        const sql = 'SELECT * FROM poltrona';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Erro ao obter poltronas:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }

    static obterPoltronaPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM poltrona WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao obter poltrona por ID:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result[0]);
            }
        });
    }

    static async criarPoltrona(req, res) {
        try {
            const poltrona = req.body;
            await PoltronaController.validarPoltrona(poltrona);
            const { numero, fileira, status } = req.body;
            const sql = 'INSERT INTO poltrona (numero, fileira, status) VALUES (?, ?, ?)';
            db.query(sql, [numero, fileira, status], (err, result) => {
                if (err) {
                    console.error('Erro ao criar poltrona:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Poltrona criada com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static async atualizarPoltrona(req, res) {
        try {
            const poltrona = req.body;
            await PoltronaController.validarPoltrona(poltrona);
            const { id } = req.params;
            const { numero, fileira, status } = req.body;
            const sql = 'UPDATE poltrona SET numero = ?, fileira = ?, status = ? WHERE id = ?';
            db.query(sql, [numero, fileira, status, id], (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar poltrona:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Poltrona atualizada com sucesso' });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirPoltrona(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM poltrona WHERE id = ?';
        db.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao excluir poltrona:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ mensagem: 'Poltrona excluída com sucesso' });
            }
        });
    }
}

module.exports = PoltronaController;