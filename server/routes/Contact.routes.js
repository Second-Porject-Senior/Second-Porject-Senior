const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact.model.js');

// Get all contacts
router.get('/getall', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new contact
router.post('/add', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    phone: req.body.phone
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 