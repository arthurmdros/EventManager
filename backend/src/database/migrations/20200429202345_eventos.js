exports.up = function(knex) {
    return knex.schema.createTable('eventos', function (table) {
        table.string('id').primary;
        table.string('nome').notNullable();
        table.date('data').notNullable();
        table.string('horario').notNullable();
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('eventos');
};
