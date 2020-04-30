exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function (table){
        table.string('id').primary();
        table.string('login').notNullable();
        table.string('senha').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
