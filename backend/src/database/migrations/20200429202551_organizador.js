exports.up = function(knex) {
    return knex.schema.createTable('organizador', function (table) {
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('telefone');
        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('usuarios');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('organizador');
};
