exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table) {
        table.string('id').primary;
        table.string('login').notNullable();
        table.string('password').notNullable();

        table.string('comp_id').notNullable();

        table.foreign('comp_id').references('id').inTable('company');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin');
};
