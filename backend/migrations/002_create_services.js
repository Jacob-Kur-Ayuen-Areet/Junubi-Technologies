/**
 * Migration: Create services table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('services', (t) => {
    t.increments('id').primary();
    t.string('category', 100).notNullable();
    t.string('name', 200).notNullable();
    t.string('slug', 200).notNullable().unique();
    t.text('description').notNullable();
    t.string('price_tier', 100); // e.g. "From $5/mo", "Custom Quote"
    t.boolean('is_active').notNullable().defaultTo(true);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('slug');
    t.index('category');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('services');
};
