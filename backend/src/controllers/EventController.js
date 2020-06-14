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
        
        const serializedEvents = events.map(event => {
            return{
                ...event,
                image_url: `http://localhost:3333/uploads/${event.image}`,
            };
        });

        res.header('Total-Events', count['count(*)']);
        return res.json(serializedEvents);
    },
        
    async create(req,res){
        const {
            title,
            description,
            selectedStartDate,
            selectedEndDate,
            selectedStartTime,
            selectedEndTime,
            selectedValue,
            latitude,
            longitude,
            city,
            uf
        } = req.body;

        const user_id = req.headers.authorization;

        const trx = await connection.transaction();

        const id = crypto.randomBytes(4).toString('Hex');

        const event = {
            id,
            image: req.file.filename,
            title,
            description,
            selectedStartDate,
            selectedEndDate,
            selectedStartTime,
            selectedEndTime,
            selectedValue,
            latitude,
            longitude,
            city,
            uf,
            user_id,
        };
        
        await trx('event').insert(event);      

        await trx.commit();

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

        const {
            title,
            description,
            selectedStartDate,
            selectedEndDate,
            selectedStartTime,
            selectedEndTime,
            selectedValue,
            latitude,
            longitude,
            city,
            uf
        } = req.body;
        
        const evento = await connection('event')
            .where('id', id)
            .select('user_id')
            .first()

        if(evento.user_id !== user_id){
            return res.status(401).json({ error: "Operação não permitida para o usuário."})
        }

        const trx = await connection.transaction();

        const event = {
            id,
            image: req.file.filename,
            title,
            description,
            selectedStartDate,
            selectedEndDate,
            selectedStartTime,
            selectedEndTime,
            selectedValue,
            latitude,
            longitude,
            city,
            uf,
            user_id,
        };
           
        await trx('event').where('id', id).update(event);      

        await trx.commit();

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