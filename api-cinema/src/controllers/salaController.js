const db = require('../config/db');
const Joi = require('joi');

class SalaController {

    static async validarSala(sala) {
        const schema = Joi.object({
            capacidade: Joi.number().required(),
            nome: Joi.string().required(),
            local: Joi.string().required(),
        });
    
        return schema.validateAsync(sala);
    }

    static listarSalas(req, res) {
        const sql = 'SELECT * FROM sala';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Erro ao obter salas:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }

    static obterSalaPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM sala WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao obter sala por ID:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result[0]);
            }
        });
    }

    static async criarSala(req, res) {
        try {
            const sala = req.body;
            await SalaController.validarSala(sala);
            const { capacidade, nome, local } = req.body;
            const sql = 'INSERT INTO sala (capacidade, nome, local) VALUES (?, ?, ?)';
            db.query(sql, [capacidade, nome, local], (err, result) => {
                if (err) {
                    console.error('Erro ao criar sala:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Sala criada com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static async atualizarSala(req, res) {
        try {
            const sala = req.body;
            await SalaController.validarSala(sala);
            const { id } = req.params;
            const { capacidade, nome, local } = req.body;
            const sql = 'UPDATE sala SET capacidade = ?, nome = ?, local = ? WHERE id = ?';
            db.query(sql, [capacidade, nome, local, id], (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar sala:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Sala atualizada com sucesso' });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirSala(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM sala WHERE id = ?';
        db.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao excluir sala:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ mensagem: 'Sala excluída com sucesso' });
            }
        });
    }

    static obterPoltronasDaSala(req, res) {
        const { salaId } = req.params;
        const sql = 'SELECT * FROM poltrona WHERE sala_id = ?';
    
        db.query(sql, [salaId], (err, result) => {
            if (err) {
                console.error('Erro ao obter poltronas da sala:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
            });
    }
}

module.exports = SalaController;