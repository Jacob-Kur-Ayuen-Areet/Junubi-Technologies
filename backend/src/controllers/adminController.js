const { validationResult } = require('express-validator');
const db = require('../config/db');
const logger = require('../config/logger');

// ─── Leads ────────────────────────────────────────────────────────────────────

async function listLeads(req, res, next) {
  try {
    const { status, source, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let query = db('leads').orderBy('created_at', 'desc');
    if (status) query = query.where({ status });
    if (source) query = query.where({ source });
    const [{ count }] = await query.clone().count('* as count');
    const leads = await query.limit(parseInt(limit)).offset(offset);
    res.json({ leads, total: parseInt(count), page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    next(err);
  }
}

async function updateLead(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'converted', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    }
    const updated = await db('leads').where({ id }).update({ status });
    if (!updated) return res.status(404).json({ error: 'Lead not found' });
    logger.info('Lead updated', { id, status, by: req.user.id });
    res.json({ message: 'Lead updated' });
  } catch (err) {
    next(err);
  }
}

// ─── Services ─────────────────────────────────────────────────────────────────

async function adminListServices(req, res, next) {
  try {
    const services = await db('services').orderBy('category').orderBy('name');
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

async function createService(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { category, name, slug, description, price_tier, is_active } = req.body;
    const existing = await db('services').where({ slug }).first();
    if (existing) return res.status(409).json({ error: 'Slug already exists' });
    const [id] = await db('services').insert({ category, name, slug, description, price_tier, is_active: is_active !== false });
    const service = await db('services').where({ id }).first();
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;
    const updates = (({ category, name, slug, description, price_tier, is_active }) =>
      Object.fromEntries(Object.entries({ category, name, slug, description, price_tier, is_active }).filter(([, v]) => v !== undefined))
    )(req.body);
    const updated = await db('services').where({ id }).update(updates);
    if (!updated) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service updated' });
  } catch (err) {
    next(err);
  }
}

async function deleteService(req, res, next) {
  try {
    const deleted = await db('services').where({ id: req.params.id }).delete();
    if (!deleted) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

async function adminListBlog(req, res, next) {
  try {
    const posts = await db('blog_posts')
      .join('users', 'blog_posts.author_id', 'users.id')
      .select('blog_posts.*', 'users.name as author_name')
      .orderBy('created_at', 'desc');
    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

async function createBlogPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { title, slug, content, published_at } = req.body;
    const existing = await db('blog_posts').where({ slug }).first();
    if (existing) return res.status(409).json({ error: 'Slug already exists' });
    const [id] = await db('blog_posts').insert({
      title, slug, content,
      author_id: req.user.id,
      published_at: published_at || null,
    });
    const post = await db('blog_posts').where({ id }).first();
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

async function updateBlogPost(req, res, next) {
  try {
    const { id } = req.params;
    const { title, slug, content, published_at } = req.body;
    const updates = Object.fromEntries(
      Object.entries({ title, slug, content, published_at }).filter(([, v]) => v !== undefined)
    );
    const updated = await db('blog_posts').where({ id }).update(updates);
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post updated' });
  } catch (err) {
    next(err);
  }
}

async function deleteBlogPost(req, res, next) {
  try {
    const deleted = await db('blog_posts').where({ id: req.params.id }).delete();
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
}

// ─── Tickets ──────────────────────────────────────────────────────────────────

async function adminListTickets(req, res, next) {
  try {
    const tickets = await db('tickets')
      .join('users', 'tickets.user_id', 'users.id')
      .select('tickets.*', 'users.name as client_name', 'users.email as client_email')
      .orderBy('created_at', 'desc');
    res.json({ tickets });
  } catch (err) {
    next(err);
  }
}

async function updateTicket(req, res, next) {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;
    const updated = await db('tickets').where({ id }).update(
      Object.fromEntries(Object.entries({ status, priority }).filter(([, v]) => v !== undefined))
    );
    if (!updated) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Ticket updated' });
  } catch (err) {
    next(err);
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────

async function getStats(req, res, next) {
  try {
    const [[{ leads }], [{ tickets }], [{ users }], [{ services }]] = await Promise.all([
      db('leads').count('* as leads'),
      db('tickets').count('* as tickets'),
      db('users').where({ role: 'client' }).count('* as users'),
      db('services').where({ is_active: true }).count('* as services'),
    ]);
    res.json({ leads: parseInt(leads), tickets: parseInt(tickets), users: parseInt(users), services: parseInt(services) });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listLeads, updateLead,
  adminListServices, createService, updateService, deleteService,
  adminListBlog, createBlogPost, updateBlogPost, deleteBlogPost,
  adminListTickets, updateTicket,
  getStats,
};
