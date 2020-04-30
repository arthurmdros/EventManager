const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req,res){
        const { page = 1 } = req.query;

        const [count] = await connection('company').count();

        const companys = await connection('company')
            .join('admin', 'admin.id', '=', 'company.admin_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'company.*',
                'admin.login',
            ]);

        res.header('Total-Companys', count['count(*)']);
        return res.json(companys);
    },

    async create(req,res){
        const { name, service, mail, phone} = req.body;
        const admin_id = req.headers.authorization;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('company').insert({
            id,
            name,
            service,
            mail,
            phone,
            admin_id
        });

        return res.json({id});        
    },

    async update(req,res){
        const { id } = req.params;
        const admin_id = req.headers.authorization;

        const { name, service, mail, phone} = req.body;

        const company = await connection('company')
            .where('id',id)
            .select('admin_id')
            .first()

        if(company.admin_id !== admin_id){
            return res.status(401).json({error: 'Operação não permitida!'});
        }

        await connection('company').where('id',id)
            .update({
                name,
                service,
                mail,
                phone,
                admin_id,
            })
                
        return res.json({ id });
    },

    async delete(req,res){
        const { id } = req.params;
        const admin_id = req.headers.authorization;

        const company = await connection('company')
            .where('id',id)
            .select('admin_id')
            .first()

        if(company.admin_id !== admin_id){
            return res.status(401).json({error: 'Operação não permitida!'});
        }

        await connection('company').where('id',id).delete();

        return res.status(204).send();
    }
}