const connection = require('../database/connection');

module.exports = {
    async create(req,res) {
        const { login, password } = req.body;

        const admin = await connection('admin')
            .where('login', login)
            .andWhere('password', password)
            .select('*')
            .first();

        if(!admin){
            return res.status(400).json({error : "Nenhum administrador foi encontrado."});
        }

        return res.json(admin);
    }
}