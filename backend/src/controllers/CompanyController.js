const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req,res){
        const { page = 1 } = req.query;

        const [count] = await connection('company').count();

        const companies = await connection('company')
            .join('admin', 'admin.id', '=', 'company.admin_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'company.*',
                'admin.login',
            ]);
            
        const serializedCompanies = companies.map(company => {
            return{
                ...company,
                image_url: `http://localhost:3333/uploads/${company.image}`,
            };
        });

        res.header('Total-Companys', count['count(*)']);
        return res.json(serializedCompanies);
    },

    async create(req,res){                           
        const { 
            name, 
            service, 
            mail, 
            phone, 
            latitude,
            longitude,
            city,
            uf,
            event_id
        } = req.body;

        const admin_id = req.headers.authorization;

        const trx = await connection.transaction();

        const id = crypto.randomBytes(4).toString('HEX');

        const company = {
            id,
            image: req.file.filename,
            name,
            service,
            mail,
            phone,
            latitude,
            longitude,
            city,
            uf,
            admin_id,
            event_id,
        };

        await trx('company').insert(company);      

        await trx.commit();

        return res.json({id});        
    },

    async update(req,res){
        const { id } = req.params;
        const admin_id = req.headers.authorization;

        const { 
            name, 
            service, 
            mail, 
            phone, 
            latitude,
            longitude,
            city,
            uf,
            event_id
        } = req.body;

        const company = await connection('company')
            .where('id',id)
            .select('admin_id')
            .first()

        if(company.admin_id !== admin_id){
            return res.status(401).json({error: 'Operação não permitida!'});
        }

        const trx = await connection.transaction();

        const newCompany = {
            id,
            image: req.file.filename,
            name,
            service,
            mail,
            phone,
            latitude,
            longitude,
            city,
            uf,
            admin_id,
            event_id,
        };

        await trx('company').where('id',id).update(newCompany)
             
        await trx.commit();

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
    }, 

    async selectCompanies(req, res){                                 
    
            const companys = await connection('company').where('event_id', null)                             
                .select([
                    'company.*',
                ]);    
            return res.json(companys);
    },

    async confirmCompany(req,res){
        const { id } = req.params;
        const { name, service, mail, phone, event_id} = req.body;
        
        await connection('company').where('id',id)
            .update({
                name,
                service,
                mail,
                phone,
                event_id,
            })
                
        return res.json({ id });
    },

    async selectCompany(req,res){
        const {event_id} = req.params;
                        
        const companies = await connection('company').where('event_id',event_id).select('*');

        return res.json(companies);
    },
}