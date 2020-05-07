const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
     async index(req,res){
         const users = await connection('user').select('*');

         return res.json(users);
     },

     async create(req,res){       
        const {mail,password,name, phone,company} = req.body;

        const id = crypto.randomBytes(4).toString('Hex');
        
        await connection('user').insert({
            id,
            mail,            
            password,
            name,
            phone,
            company,
        });

        return res.json({id});
     },

     async delete(req,res){
         const { id } = req.params;

         await connection('user').where('id', id).delete();

         return res.status(204).send();
     },

     async updateProfile(req,res){
         const { id } = req.params;         

         const {name, phone,company} = req.body;

         await connection('user').where('id', id)
            .update({                
                name,
                phone,
                company,                
            })

        return res.json({ id });
     },

     async updateAccount(req,res){         
        const { id } = req.params;         

        const {mail, password, confirmPassword} = req.body;

        await connection('user').where('id', id)
           .update({    
               mail,
               password               
           })

       return res.json({ id });
     }
}