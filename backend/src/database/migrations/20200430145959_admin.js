exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table) {
        table.string('id').primary;
        table.string('login').notNullable();
        table.string('password').notNullable();        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin');
};
