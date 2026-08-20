/**
 * Migration: Create users table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name', 150).notNullable();
    t.string('email', 255).notNullable().unique();
    t.string('password_hash', 255).notNullable();
    t.enum('role', ['client', 'admin']).notNullable().defaultTo('client');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('email');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users');
};
