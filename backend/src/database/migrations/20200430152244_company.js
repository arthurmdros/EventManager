exports.up = function(knex) {
    return knex.schema.createTable('company', function (table) {
        table.string('id').primary;
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('service').notNullable();        
        table.string('mail').notNullable();
        table.string('phone').notNullable();        
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

        table.string('admin_id').notNullable();
        table.string('event_id');

        table.foreign('admin_id').references('id').inTable('admin');
        table.foreign('event_id').references('id').inTable('event');
        
        
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('company');
};
