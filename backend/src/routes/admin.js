const router = require('express').Router();
const { body } = require('express-validator');
const { requireAdmin } = require('../middleware/auth');
const {
  listLeads, updateLead,
  adminListServices, createService, updateService, deleteService,
  adminListBlog, createBlogPost, updateBlogPost, deleteBlogPost,
  adminListTickets, updateTicket,
  getStats,
} = require('../controllers/adminController');

router.use(requireAdmin);

// Stats
router.get('/stats', getStats);

// Leads
router.get('/leads', listLeads);
router.patch('/leads/:id', updateLead);

// Services
router.get('/services', adminListServices);
router.post(
  '/services',
  [
    body('category').trim().notEmpty(),
    body('name').trim().notEmpty(),
    body('slug').trim().notEmpty().matches(/^[a-z0-9-]+$/).withMessage('Slug must be lowercase alphanumeric with hyphens'),
    body('description').trim().notEmpty(),
  ],
  createService
);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Blog
router.get('/blog', adminListBlog);
router.post(
  '/blog',
  [
    body('title').trim().notEmpty(),
    body('slug').trim().notEmpty().matches(/^[a-z0-9-]+$/).withMessage('Slug must be lowercase alphanumeric with hyphens'),
    body('content').trim().notEmpty(),
  ],
  createBlogPost
);
router.put('/blog/:id', updateBlogPost);
router.delete('/blog/:id', deleteBlogPost);

// Tickets
router.get('/tickets', adminListTickets);
router.patch('/tickets/:id', updateTicket);

module.exports = router;
