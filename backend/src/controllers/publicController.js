const { validationResult } = require('express-validator');
const db = require('../config/db');
const { sendEmail } = require('../config/email');
const logger = require('../config/logger');

async function submitContact(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, email, message, service_interest } = req.body;
    const [id] = await db('leads').insert({
      name,
      email,
      message,
      service_interest: service_interest || null,
      source: 'contact',
      status: 'new',
    });

    logger.info('Contact form submitted', { id, email });

    // Notify admin (fire-and-forget)
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New contact from ${name}`,
      html: `<p><strong>${name}</strong> (${email}) sent a message:</p><blockquote>${message}</blockquote><p>Service interest: ${service_interest || 'not specified'}</p>`,
    });

    res.status(201).json({ message: 'Thank you! We will get back to you shortly.', id });
  } catch (err) {
    next(err);
  }
}

async function submitQuote(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, email, message, service_interest } = req.body;
    const [id] = await db('leads').insert({
      name,
      email,
      message,
      service_interest,
      source: 'quote',
      status: 'new',
    });

    logger.info('Quote request submitted', { id, email, service_interest });

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New quote request from ${name}`,
      html: `<p><strong>${name}</strong> (${email}) requested a quote for <strong>${service_interest}</strong>:</p><blockquote>${message}</blockquote>`,
    });

    res.status(201).json({ message: 'Quote request received! We will prepare a proposal for you.', id });
  } catch (err) {
    next(err);
  }
}

async function listServices(req, res, next) {
  try {
    const services = await db('services').where({ is_active: true }).orderBy('category').orderBy('name');
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

async function getService(req, res, next) {
  try {
    const service = await db('services').where({ slug: req.params.slug, is_active: true }).first();
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ service });
  } catch (err) {
    next(err);
  }
}

async function listBlog(req, res, next) {
  try {
    const posts = await db('blog_posts')
      .whereNotNull('published_at')
      .where('published_at', '<=', db.fn.now())
      .join('users', 'blog_posts.author_id', 'users.id')
      .select('blog_posts.*', 'users.name as author_name')
      .orderBy('published_at', 'desc');
    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

async function getBlogPost(req, res, next) {
  try {
    const post = await db('blog_posts')
      .where({ 'blog_posts.slug': req.params.slug })
      .whereNotNull('published_at')
      .join('users', 'blog_posts.author_id', 'users.id')
      .select('blog_posts.*', 'users.name as author_name')
      .first();
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitContact, submitQuote, listServices, getService, listBlog, getBlogPost };
