exports.up = function(knex) {
    return knex.schema.createTable('ticket', function (table) {
        table.string('id').primary;
        table.string('type').notNullable();
        table.decimal('value').notNullable();        
        table.integer('amount').notNullable();
        
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('ticket');
};
