exports.up = function(knex) {
    return knex.schema.createTable('user', function(table) {
        table.string('id').primary;
        table.string('mail').notNullable();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.string('company').notNullable();
    
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
