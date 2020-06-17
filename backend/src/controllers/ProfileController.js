const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const user_id = req.headers.authorization;

        const events = await connection('event')
            .where('user_id', user_id)
            .select('*');

        const serializedEvents = events.map(event => {
            return{
                ...event,
                image_url: `http://localhost:3333/uploads/${event.image}`,
            };
        });

        return res.json(serializedEvents);
    }
}