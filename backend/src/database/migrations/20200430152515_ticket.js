exports.up = function(knex) {
    return knex.schema.createTable('ticket', function (table) {
        table.increments();
        table.string('type').notNullable();
        table.decimal('value').notNullable();        
        table.integer('amount').notNullable();
        
        table.string('event_id');

        table.foreign('event_id').references('id').inTable('event');
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('ticket');
};
