/**
 * Migration: Create tickets and ticket_replies tables
 */
exports.up = async function (knex) {
  await knex.schema.createTable('tickets', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.string('subject', 300).notNullable();
    t.text('message').notNullable();
    t.enum('status', ['open', 'in_progress', 'resolved', 'closed']).notNullable().defaultTo('open');
    t.enum('priority', ['low', 'medium', 'high', 'urgent']).notNullable().defaultTo('medium');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('user_id');
    t.index('status');
  });

  await knex.schema.createTable('ticket_replies', (t) => {
    t.increments('id').primary();
    t.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets').onDelete('CASCADE');
    t.enum('sender', ['client', 'admin']).notNullable();
    t.text('message').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('ticket_id');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('ticket_replies');
  await knex.schema.dropTableIfExists('tickets');
};
