const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const { page = 1 } = req.query;

        const [count] = await connection('eventos').count();

        const eventos = await connection('eventos')
           .join('organizador', 'organizador.user_id', '=', 'eventos.org_id')
           .limit(5)
           .offset((page - 1) * 5)
           .select([
               'eventos.*',
               'organizador.nome',
               'organizador.email',
               'organizador.telefone'
           ]);
        
        res.header('Total', count['count(*)']);
        return res.json(eventos)
    },
        
    async create(req,res){
        const {nome, data, horario} = req.body;
        const org_id = req.headers.authorization;

        const id = crypto.randomBytes(4).toString('Hex');

        await connection('eventos').insert({
            id,
            nome,
            data,
            horario,
            org_id,
        });

        return res.json({id});
    },

    async delete(req,res) {
        const { id } = req.params;
        const org_id = req.headers.authorization;

        const evento = await connection('eventos')
            .where('id', id)
            .select('org_id')
            .first()

        if (evento.org_id !== org_id){
            return res.status(401).json({ error: "Operação não permitida para o usuário."})
        }

        await connection('eventos').where('id', id).delete();

        return res.status(204).send();
    },

    async update(req,res){
        const { id } = req.params;
        const org_id = req.headers.authorization;

        const { nome, data, horario } = req.body;
        
        const evento = await connection('eventos')
            .where('id', id)
            .select('org_id')
            .first()

        if(evento.org_id !== org_id){
            return res.status(401).json({ error: "Operação não permitida para o usuário."})
        }
        else{
            await connection('eventos').where('id',id)
                .update({
                    nome,
                    data,
                    horario,
                })
            return res.json({id});
        }
    }
}