const db = require('../config/db');
const Joi = require('joi');

class SessaoController {

    static async validarSessao(sessao) {
        const schema = Joi.object({
            hora_inicio: Joi.string().required(),
            hora_fim: Joi.string().required(),
            data: Joi.string().isoDate().required(),
            valor: Joi.number().required(),
            sala_id: Joi.number().required(),
            ingresso_id: Joi.number().required(),
            filme_id: Joi.number().required(),
        });
    
        return schema.validateAsync(sessao);
    }

    static listarSessoes(req, res) {
        const sql = 'SELECT * FROM sessao';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Erro ao obter sessões:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }

    static obterSessaoPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM sessao WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao obter sessão por ID:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result[0]);
            }
        });
    }

    static async criarSessao(req, res) {
        try {
            const sessao = req.body;
            await SessaoController.validarSessao(sessao);
            const { hora_inicio, hora_fim, data, valor, sala_id, ingresso_id, filme_id } = req.body;
            const sql = 'INSERT INTO sessao (hora_inicio, hora_fim, data, valor, sala_id, ingresso_id, filme_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(sql, [hora_inicio, hora_fim, data, valor, sala_id, ingresso_id, filme_id], (err, result) => {
                if (err) {
                    console.error('Erro ao criar sessão:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Sessão criada com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static async atualizarSessao(req, res) {
        try {
            const sessao = req.body;
            await SessaoController.validarSessao(sessao);
            const { id } = req.params;
            const { hora_inicio, hora_fim, data, valor, sala_id, ingresso_id, filme_id } = req.body;
            const sql = 'UPDATE sessao SET hora_inicio = ?, hora_fim = ?, data = ?, valor = ?, sala_id = ?, ingresso_id = ?, filme_id = ? WHERE id = ?';
            db.query(sql, [hora_inicio, hora_fim, data, valor, sala_id, ingresso_id, filme_id, id], (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar sessão:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Sessão atualizada com sucesso' });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirSessao(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM sessao WHERE id = ?';
        db.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao excluir sessão:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ mensagem: 'Sessão excluída com sucesso' });
            }
        });
    }
}

module.exports = SessaoController;