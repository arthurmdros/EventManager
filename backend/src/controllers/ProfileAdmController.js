const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const admin_id = req.headers.authorization;

        const companies = await connection('company')
            .where('admin_id', admin_id)
            .select('*');

        const serializedCompanies = companies.map(company => {
            return{
                ...company,
                image_url: `http://localhost:3333/uploads/${company.image}`,
            };
        });

        return res.json(serializedCompanies);
    }
}