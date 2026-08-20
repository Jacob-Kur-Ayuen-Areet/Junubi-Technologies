const { validationResult } = require('express-validator');
const db = require('../config/db');
const logger = require('../config/logger');

async function getClientServices(req, res, next) {
  try {
    const rows = await db('client_services')
      .where({ 'client_services.user_id': req.user.id })
      .join('services', 'client_services.service_id', 'services.id')
      .select(
        'client_services.*',
        'services.name as service_name',
        'services.category',
        'services.slug'
      );
    res.json({ services: rows });
  } catch (err) {
    next(err);
  }
}

async function getClientInvoices(req, res, next) {
  try {
    const invoices = await db('invoices')
      .where({ user_id: req.user.id })
      .orderBy('due_date', 'desc');
    res.json({ invoices });
  } catch (err) {
    next(err);
  }
}

async function listClientTickets(req, res, next) {
  try {
    const tickets = await db('tickets')
      .where({ user_id: req.user.id })
      .orderBy('created_at', 'desc');
    res.json({ tickets });
  } catch (err) {
    next(err);
  }
}

async function createTicket(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { subject, message, priority } = req.body;
    const [id] = await db('tickets').insert({
      user_id: req.user.id,
      subject,
      message,
      status: 'open',
      priority: priority || 'medium',
    });

    logger.info('Ticket created', { id, user_id: req.user.id });
    const ticket = await db('tickets').where({ id }).first();
    res.status(201).json({ ticket });
  } catch (err) {
    next(err);
  }
}

module.exports = { getClientServices, getClientInvoices, listClientTickets, createTicket };
