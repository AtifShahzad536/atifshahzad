const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
