const db = require('../config/db');
const Joi = require('joi');

class IngressoController {

    static async validarIngresso(ingresso) {
        const schema = Joi.object({
            valor: Joi.number().required(),
            hora: Joi.string().required(),
            poltrona_id: Joi.number().required(),
            venda_id: Joi.number().required(),
            sessao_id: Joi.number().required(),
        });
    
        return schema.validateAsync(ingresso);
    }

    static listarIngressos(req, res) {
        const sql = 'SELECT * FROM ingresso';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Erro ao obter ingressos:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }

    static obterIngressoPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM ingresso WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao obter ingresso por ID:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result[0]);
            }
        });
    }

    static async criarIngresso(req, res) {
        try {
            const ingresso = req.body;
            await IngressoController.validarIngresso(ingresso);
            const { valor, hora, poltrona_id, venda_id, sessao_id } = req.body;
            const sql = 'INSERT INTO ingresso (valor, hora, poltrona_id, venda_id, sessao_id) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [valor, hora, poltrona_id, venda_id, sessao_id], (err, result) => {
                if (err) {
                    console.error('Erro ao criar ingresso:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Ingresso criado com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static async atualizarIngresso(req, res) {
        try {
            const ingresso = req.body;
            await IngressoController.validarIngresso(ingresso);
            const { id } = req.params;
            const { valor, hora, poltrona_id, venda_id, sessao_id } = req.body;
            const sql = 'UPDATE ingresso SET valor = ?, hora = ?, poltrona_id = ?, venda_id = ?, sessao_id = ? WHERE id = ?';
            db.query(sql, [valor, hora, poltrona_id, venda_id, sessao_id, id], (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar ingresso:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Ingresso atualizado com sucesso' });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirIngresso(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM ingresso WHERE id = ?';
        db.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao excluir ingresso:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ mensagem: 'Ingresso excluído com sucesso' });
            }
        });
    }
}

module.exports = IngressoController;