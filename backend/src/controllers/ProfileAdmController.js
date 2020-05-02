const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const admin_id = req.headers.authorization;

        const companys = await connection('company')
            .where('admin_id', admin_id)
            .select('*');

        return res.json(companys);
    }
}