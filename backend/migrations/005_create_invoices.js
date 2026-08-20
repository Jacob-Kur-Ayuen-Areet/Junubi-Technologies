/**
 * Migration: Create invoices table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('invoices', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.decimal('amount', 10, 2).notNullable();
    t.string('currency', 10).notNullable().defaultTo('USD');
    t.enum('status', ['pending', 'paid', 'overdue', 'cancelled']).notNullable().defaultTo('pending');
    t.date('due_date').notNullable();
    t.timestamp('paid_at');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('user_id');
    t.index('status');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('invoices');
};
