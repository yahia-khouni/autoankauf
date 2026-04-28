const express = require('express');
const bcrypt = require('bcryptjs');
const database = require('../config/database');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * ONE-TIME ADMIN SETUP ENDPOINT
 * This endpoint allows you to create the first admin account after deployment
 * It automatically disables itself after first use for security
 * 
 * Usage:
 * POST https://yourdomain.com/api/setup/create-first-admin
 * Body: {
 *   "firstName": "Your Name",
 *   "lastName": "Your Last Name", 
 *   "email": "admin@yourdomain.com",
 *   "phone": "1234567890",
 *   "password": "YourSecurePassword123!"
 * }
 * 
 * IMPORTANT: After creating your admin account, this endpoint will stop working
 * for security reasons. You can then create other admins from the admin panel.
 */

router.post('/create-first-admin', async (req, res) => {
  try {
    // Check if any admin already exists
    const [existingAdmins] = await database.getPool().execute(
      `SELECT id FROM staff WHERE role = 'admin' LIMIT 1`
    );

    if (existingAdmins.length > 0) {
      logger.warn('Attempt to create admin when admin already exists');
      return res.status(403).json({
        success: false,
        message: '⛔ Setup already completed. Admin account already exists. Please use the login page.'
      });
    }

    // Get data from request body
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, email, password'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate password strength (at least 8 characters)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the admin account
    const [result] = await database.getPool().execute(
      `INSERT INTO staff 
       (first_name, last_name, email, phone, role, password_hash, is_active, employment_status, created_at) 
       VALUES (?, ?, ?, ?, 'admin', ?, true, 'active', NOW())`,
      [firstName, lastName, email, phone || '', passwordHash]
    );

    logger.info(`✅ First admin account created successfully: ${email}`);

    res.status(201).json({
      success: true,
      message: '✅ Admin account created successfully! You can now login.',
      data: {
        id: result.insertId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: 'admin'
      },
      note: '⚠️ This setup endpoint is now disabled. Create additional admins from the admin panel.'
    });

  } catch (error) {
    logger.error('Error creating first admin:', error);
    
    // Check for duplicate email
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create admin account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Check if setup is needed
 * GET /api/setup/status
 */
router.get('/status', async (req, res) => {
  try {
    const [existingAdmins] = await database.getPool().execute(
      `SELECT id FROM staff WHERE role = 'admin' LIMIT 1`
    );

    res.json({
      success: true,
      setupRequired: existingAdmins.length === 0,
      message: existingAdmins.length === 0 
        ? 'No admin account found. Setup required.' 
        : 'Admin account exists. Setup complete.'
    });
  } catch (error) {
    logger.error('Error checking setup status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check setup status'
    });
  }
});

module.exports = router;
