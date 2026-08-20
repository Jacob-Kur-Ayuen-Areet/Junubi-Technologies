/**
 * Migration: Create leads table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('leads', (t) => {
    t.increments('id').primary();
    t.string('name', 150).notNullable();
    t.string('email', 255).notNullable();
    t.text('message').notNullable();
    t.string('service_interest', 200);
    t.enum('source', ['contact', 'quote']).notNullable().defaultTo('contact');
    t.enum('status', ['new', 'contacted', 'converted', 'closed']).notNullable().defaultTo('new');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('email');
    t.index('status');
    t.index('source');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('leads');
};
