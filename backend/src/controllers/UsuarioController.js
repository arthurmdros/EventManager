const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (req,res) {
        const users = await connection('usuarios').select('*');

        return res.json(users);
    }, 
    
    async create (req,res) {
        const {login,senha} = req.body;

        const id = crypto.randomBytes(4).toString('Hex');

        await connection('usuarios').insert({
            id,
            login,
            senha,            
        });

        return res.json({id});
    },

    async delete (req, res) {
        const { id } = req.params;

        await connection('usuarios').where('id', id).delete();

        return res.json(204).send();
    },

    async update (req,res) {
        const { id } = req.params;

        const {login,senha} = req.body;

        await connection('usuarios').where('id', id)
        .update({
            login,
            senha,
        });

        return res.json({id});
    }
}