const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req,res) {
        const tickets = await connection('ticket').select('*');

        return res.json(tickets);
    },

    async create(req,res){
        const {type,value,amount,event_id} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ticket').insert({
            id,
            type,
            value,
            amount,
            event_id
        });

        res.json({id});
    },

    async delete(req,res){
        const {id} = req.params;

        await connection('ticket').where('id', id).delete();

        return res.json(204).send();
    },

    async update(req,res){
        const {id} = req.params;
        const {type,value,amount,event_id} = req.body;

        await connection('ticket').where('id',id)
            .update({
                type,
                value,
                amount,
                event_id,
            });
        
        return res.json({id});
    }
}