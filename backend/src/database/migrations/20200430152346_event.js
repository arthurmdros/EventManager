exports.up = function(knex) {
    return knex.schema.createTable('event', function (table) {
        table.string('id').primary;
        table.string('image').notNullable();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('selectedStartTime').notNullable();
        table.string('selectedEndTime').notNullable();
        table.string('selectedStartDate').notNullable();
        table.string('selectedEndDate').notNullable();
        table.string('selectedValue').notNullable();        
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        
        table.string('user_id').notNullable();
                
        table.foreign('user_id').references('id').inTable('user');
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('event');
};
