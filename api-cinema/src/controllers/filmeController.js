const db = require('../config/db');
const Joi = require('joi');


class FilmeController {

    static async validarFilme(filme) {
        const schema = Joi.object({
            titulo: Joi.string().required(),
            sinopse: Joi.string().required(),
            atores: Joi.string().required(),
            diretor: Joi.string().required(),
            tempo: Joi.number().required(),
        });
    
        return schema.validateAsync(filme);
    }

    static listarFilmes(req, res) {
        const sql = 'SELECT * FROM filme';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Erro ao obter filmes:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }

    static obterFilmePorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM filme WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao obter filme por ID:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result[0]);
            }
        });
    }

    static async criarFilme(req, res) {
        try {
            const filme = req.body;
            await FilmeController.validarFilme(filme);
            const { titulo, sinopse, atores, diretor, tempo } = req.body;
            const sql = 'INSERT INTO filme (titulo, sinopse, atores, diretor, tempo) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [titulo, sinopse, atores, diretor, tempo], (err, result) => {
                if (err) {
                    console.error('Erro ao criar filme:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Filme criado com sucesso', id: result.insertId });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static async atualizarFilme(req, res) {
        try {
            const filme = req.body;
            await FilmeController.validarFilme(filme);
            const { id } = req.params;
            const { titulo, sinopse, atores, diretor, tempo } = req.body;
            const sql = 'UPDATE filme SET titulo = ?, sinopse = ?, atores = ?, diretor = ?, tempo = ? WHERE id = ?';
            db.query(sql, [titulo, sinopse, atores, diretor, tempo, id], (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar filme:', err.message);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    res.json({ mensagem: 'Filme atualizado com sucesso' });
                }
            });
        } catch (error) {
            console.error('Erro de validação:', error.message);
            res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    static excluirFilme(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM filme WHERE id = ?';
        db.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao excluir filme:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json({ mensagem: 'Filme excluído com sucesso' });
            }
        });
    }

    static obterSessoesDoFilme(req, res) {
        const { filmeId } = req.params;
        const sql = 'SELECT * FROM sessao WHERE filme_id = ?';
    
        db.query(sql, [filmeId], (err, result) => {
            if (err) {
                console.error('Erro ao obter sessões do filme:', err.message);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.json(result);
            }
        });
    }
}

module.exports = FilmeController;