const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req,res){
        const { page = 1 } = req.query;

        const [count] = await connection('event').count();

        const events = await connection('event')
           .join('user', 'user.id', '=', 'event.user_id')
           .limit(5)
           .offset((page - 1) * 5)
           .select('event.*');
        
        res.header('Total-Events', count['count(*)']);
        return res.json(events)
    },
        
    async create(req,res){
        const {title,description,selectedStartDate,selectedEndDate,selectedStartTime,selectedEndTime,selectedValue} = req.body;
        const user_id = req.headers.authorization;

        const id = crypto.randomBytes(4).toString('Hex');

        await connection('event').insert({
            id,
            title,
            description,
            selectedStartDate,            
            selectedEndDate,
            selectedStartTime,
            selectedEndTime,            
            selectedValue,
            user_id,
        });

        return res.json({id});
    },

    async delete(req,res) {
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const evento = await connection('event')
            .where('id', id)
            .select('user_id')
            .first()

        if (evento.user_id !== user_id){
            return res.status(401).json({ error: "Operação não permitida para o usuário."})
        }

        await connection('event').where('id', id).delete();

        return res.status(204).send();
    },

    async update(req,res){
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const {title,description,selectedStartDate,selectedEndDate,selectedStartTime,selectedEndTime,selectedValue} = req.body;
        
        const evento = await connection('event')
            .where('id', id)
            .select('user_id')
            .first()

        if(evento.user_id !== user_id){
            return res.status(401).json({ error: "Operação não permitida para o usuário."})
        }

        await connection('event').where('id',id)
            .update({
                id,
                title,
                description,
                selectedStartDate,            
                selectedEndDate,
                selectedStartTime,
                selectedEndTime,            
                selectedValue,
                user_id,
            })
        return res.json({id});
        
    },

    async selectCategorie(req,res) {
        const { page = 1 } = req.query;
        const { selectedValue } = req.params;

        const [count] = await connection('event').count();

        const events = await connection('event')
           .join('user', 'user.id', '=', 'event.user_id')
           .limit(5)
           .offset((page - 1) * 5)
           .where('selectedValue', selectedValue)
           .select('event.*');
        
        res.header('Total-Events', count['count(*)']);
        return res.json(events)
    }
}