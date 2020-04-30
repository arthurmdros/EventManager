const connection = require('../database/connection');

module.exports = {
     async index(req,res){
         const orgs = await connection('organizador').select('*');

         return res.json(orgs);
     },

     async create(req,res){
        const {user_id} = req.params;        
        const {nome,email,telefone} = req.body;
        
        await connection('organizador').insert({
            user_id,
            nome,
            email,
            telefone,
        });

        return res.json({user_id});
     },

     async delete(req,res){
         const { user_id } = req.params;

         await connection('organizador').where('user_id', user_id).delete();

         return res.status(204).send();
     },

     async update(req,res){
         const { user_id } = req.params;         

         const {nome,email,telefone} = req.body;

         await connection('organizador').where('user_id', user_id)
            .update({
                nome,
                email,
                telefone                
            })

        return res.json({ user_id });
     }
}