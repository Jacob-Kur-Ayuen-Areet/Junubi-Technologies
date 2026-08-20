const router = require('express').Router();
const { body } = require('express-validator');
const { requireClient } = require('../middleware/auth');
const { getClientServices, getClientInvoices, listClientTickets, createTicket } = require('../controllers/clientController');

router.use(requireClient);

router.get('/services', getClientServices);
router.get('/invoices', getClientInvoices);
router.get('/tickets', listClientTickets);
router.post(
  '/tickets',
  [
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  ],
  createTicket
);

module.exports = router;
