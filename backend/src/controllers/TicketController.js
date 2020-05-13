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

    async selectTicket(req,res){
        const {event_id} = req.params;
                        
        const tickets = await connection('ticket').where('event_id',event_id).select('*');

        return res.json(tickets);
    },
}