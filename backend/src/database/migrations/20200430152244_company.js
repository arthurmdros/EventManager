exports.up = function(knex) {
    return knex.schema.createTable('company', function (table) {
        table.string('id').primary;
        table.string('name').notNullable();
        table.string('service').notNullable();        
        table.string('mail').notNullable();
        table.string('phone').notNullable();
        
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('company');
};