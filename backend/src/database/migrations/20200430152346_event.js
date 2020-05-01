exports.up = function(knex) {
    return knex.schema.createTable('event', function (table) {
        table.string('id').primary;
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.time('start_time', { precision: 6 }).notNullable();
        table.time('end_time', { precision: 6 }).notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.string('event').notNullable();
        
        table.string('user_id').notNullable();
                
        table.foreign('user_id').references('id').inTable('user');
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('event');
};
