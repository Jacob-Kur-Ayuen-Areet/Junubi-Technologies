const router = require('express').Router();
const { body } = require('express-validator');
const { formLimiter } = require('../middleware/rateLimiter');
const {
  submitContact, submitQuote, listServices, getService, listBlog, getBlogPost,
} = require('../controllers/publicController');

router.get('/services', listServices);
router.get('/services/:slug', getService);

router.get('/blog', listBlog);
router.get('/blog/:slug', getBlogPost);

router.post(
  '/contact',
  formLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('service_interest').optional().trim().escape(),
  ],
  submitContact
);

router.post(
  '/quotes',
  formLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('service_interest').trim().notEmpty().withMessage('Please select a service'),
    body('message').trim().isLength({ min: 10 }).withMessage('Please describe your requirements (min 10 chars)'),
  ],
  submitQuote
);

module.exports = router;
