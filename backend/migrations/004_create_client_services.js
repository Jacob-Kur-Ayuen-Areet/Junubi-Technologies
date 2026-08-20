/**
 * Migration: Create client_services table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('client_services', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.integer('service_id').unsigned().notNullable().references('id').inTable('services').onDelete('RESTRICT');
    t.string('domain_name', 255);
    t.enum('status', ['active', 'suspended', 'expired', 'pending']).notNullable().defaultTo('active');
    t.date('start_date').notNullable();
    t.date('renewal_date');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('user_id');
    t.index('status');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('client_services');
};
