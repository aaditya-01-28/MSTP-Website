const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const Career = require('../models/Career');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');
const Testimonial = require('../models/Testimonial');
const TeamMember = require('../models/TeamMember');
const SiteSettings = require('../models/SiteSettings');
const Contact = require('../models/Contact');
const Application = require('../models/Application');

// Helper to create CRUD routes for a given model
const createCrudRoutes = (model, pathName) => {
  // Public GET all
  router.get(`/${pathName}`, async (req, res) => {
    try {
      const items = await model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Public GET one
  router.get(`/${pathName}/:id`, async (req, res) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Protected POST
  router.post(`/${pathName}`, authMiddleware, async (req, res) => {
    try {
      const newItem = new model(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Protected PUT
  router.put(`/${pathName}/:id`, authMiddleware, async (req, res) => {
    try {
      const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Protected DELETE
  router.delete(`/${pathName}/:id`, authMiddleware, async (req, res) => {
    try {
      await model.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
};

// Generate standard CRUD routes
createCrudRoutes(Career, 'careers');
createCrudRoutes(Service, 'services');
createCrudRoutes(Portfolio, 'portfolios');
createCrudRoutes(Testimonial, 'testimonials');
createCrudRoutes(TeamMember, 'team');
createCrudRoutes(Contact, 'contacts');
createCrudRoutes(Application, 'applications');

// Special route for SiteSettings (Singleton)
router.get('/settings', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/settings', authMiddleware, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    } else {
      settings = new SiteSettings(req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
