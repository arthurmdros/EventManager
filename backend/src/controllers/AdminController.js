const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (req,res) {
        const admin = await connection('admin').select('*');

        return res.json(admin);
    }, 
    
    async create (req,res) {
        const {login,password} = req.body;

        const id = crypto.randomBytes(4).toString('Hex');

        await connection('admin').insert({
            id,
            login,
            password,            
        });

        return res.json({id});
    },

    async delete (req, res) {
        const { id } = req.params;

        await connection('admin').where('id', id).delete();

        return res.json(204).send();
    },

    async update (req,res) {
        const { id } = req.params;

        const {password, confirmPassword} = req.body;

        await connection('admin').where('id', id)
        .update({
            password,
        });

        return res.json({id});
    }
}