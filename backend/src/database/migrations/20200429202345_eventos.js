exports.up = function(knex) {
    return knex.schema.createTable('eventos', function (table) {
        table.string('id').primary;
        table.string('nome').notNullable();
        table.date('data').notNullable();
        table.string('horario').notNullable();
        
        table.string('org_id').notNullable();

        table.foreign('org_id').references('user_id').inTable('organizador');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('eventos');
};
