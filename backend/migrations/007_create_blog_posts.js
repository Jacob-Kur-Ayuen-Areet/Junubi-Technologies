/**
 * Migration: Create blog_posts table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('blog_posts', (t) => {
    t.increments('id').primary();
    t.string('title', 300).notNullable();
    t.string('slug', 300).notNullable().unique();
    t.text('content').notNullable();
    t.integer('author_id').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT');
    t.text('excerpt');
    t.string('cover_image', 500);
    t.timestamp('published_at');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index('slug');
    t.index('published_at');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('blog_posts');
};
