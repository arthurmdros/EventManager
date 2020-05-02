const connection = require('../database/connection');

module.exports = {
    async create(req,res) {
        const { login, password } = req.body;

        const user = await connection('user')
            .where('mail', login)
            .andWhere('password', password)
            .select('*')
            .first();

        if(!user){
            return res.status(400).json({error : "Nenhum usuário foi encontrado."});
        }

        return res.json(user);
    }
}