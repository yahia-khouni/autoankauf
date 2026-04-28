const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.templateCache = new Map();
    this.emailQueue = [];
    this.isProcessingQueue = false;
    this.isInitialized = false;
    this.shopInfoCache = null;
    this.shopInfoCacheTime = null;
    
    this.registerHelpers();
  }

  // Get shop information dynamically from database
  async getShopInfo() {
    logger.info('getShopInfo() called');
    
    // Cache shop info for 5 minutes
    if (this.shopInfoCache && this.shopInfoCacheTime && (Date.now() - this.shopInfoCacheTime < 5 * 60 * 1000)) {
      logger.info('Returning cached shop info:', this.shopInfoCache);
      return this.shopInfoCache;
    }

    logger.info('Cache expired or empty, fetching from database...');

    try {
      const ShopSettings = require('../models/ShopSettings');
      
      // Fetch the shop_info object which contains all shop information
      const shopInfo = await ShopSettings.get('shop_info');

      logger.info('Database shop_info retrieved:', shopInfo);

      // Build the email-friendly shop info object
      // Extract primary URL from comma-separated FRONTEND_URL (for CORS we allow multiple, but emails need one)
      const primaryUrl = (process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:5173').split(',')[0].trim();
      
      this.shopInfoCache = {
        name: (shopInfo && shopInfo.shop_name) || process.env.SHOP_NAME || 'Barbershop',
        email: (shopInfo && shopInfo.email) || process.env.SHOP_EMAIL || 'contact@barbershop.com',
        phone: (shopInfo && shopInfo.phone) || process.env.SHOP_PHONE || '',
        address: (shopInfo && shopInfo.address) || process.env.SHOP_ADDRESS || '',
        location: (shopInfo && shopInfo.location) || '',
        instagram: (shopInfo && shopInfo.instagram_link) || '',
        facebook: (shopInfo && shopInfo.facebook_link) || '',
        website: primaryUrl
      };
      
      logger.info('Built shop info object:', this.shopInfoCache);
      
      this.shopInfoCacheTime = Date.now();
      return this.shopInfoCache;
    } catch (error) {
      logger.error('Failed to fetch shop info from database:', error);
      // Fallback to environment variables
      // Extract primary URL from comma-separated FRONTEND_URL
      const primaryUrl = (process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:5173').split(',')[0].trim();
      
      const fallbackInfo = {
        name: process.env.SHOP_NAME || 'Barbershop',
        email: process.env.SHOP_EMAIL || 'contact@barbershop.com',
        phone: process.env.SHOP_PHONE || '',
        address: process.env.SHOP_ADDRESS || '',
        location: '',
        instagram: '',
        facebook: '',
        website: primaryUrl
      };
      
      logger.warn('Using fallback shop info:', fallbackInfo);
      return fallbackInfo;
    }
  }

  // Initialize SMTP transporter
  async initializeSMTP() {
    if (this.isInitialized) return;
    
    try {
      // Validate required SMTP configuration
      if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('SMTP configuration is incomplete. Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
      }

      // Create SMTP transporter with your hosting provider's configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // mail.acstudio.tn
        port: parseInt(process.env.SMTP_PORT), // 465
        secure: true, // Use SSL/TLS for port 465
        auth: {
          user: process.env.SMTP_USER, // Your email address
          pass: process.env.SMTP_PASS  // Your email password
        },
        // Additional options for better reliability
        pool: true, // Use pooled connections
        maxConnections: 5, // Max concurrent connections
        maxMessages: 100, // Max messages per connection
        rateDelta: 1000, // Time between messages (1 second)
        rateLimit: 2 // Max 2 emails per rateDelta (120 per minute, staying under 150/hour limit)
      });

      // Verify SMTP connection
      await this.transporter.verify();
      
      this.isInitialized = true;
      logger.info('SMTP email service initialized successfully', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER
      });
    } catch (error) {
      logger.error('Failed to initialize SMTP email service:', error);
      throw error;
    }
  }

  // Register Handlebars helpers
  registerHelpers() {
    handlebars.registerHelper('formatDate', (date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    });

    handlebars.registerHelper('formatTime', (time) => {
      if (!time) return '';
      return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    });

    handlebars.registerHelper('formatCurrency', (amount) => {
      if (!amount) return '0.00 DT';
      const formatted = parseFloat(amount).toFixed(2);
      return `${formatted} DT`;
    });

    handlebars.registerHelper('if_eq', function(a, b, opts) {
      if (a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    });

    handlebars.registerHelper('eq', function(a, b) {
      return a === b;
    });
  }

  // Generic email sending method
  async sendEmail({ to, subject, html, text = null, attachments = [], from = null }) {
    try {
      // Ensure SMTP is initialized
      if (!this.isInitialized) {
        await this.initializeSMTP();
      }

      // Get shop info for default sender
      const shopInfo = await this.getShopInfo();
      
      // Use provided 'from' address or default to shop email
      const fromAddress = from || `${shopInfo.name} <${process.env.SMTP_USER}>`;

      const emailData = {
        from: fromAddress,
        to: to, // Can be a single email or array
        subject: subject,
        html: html
      };

      if (text) {
        emailData.text = text;
      }

      // Add attachments if provided
      if (attachments && attachments.length > 0) {
        emailData.attachments = attachments.map(att => ({
          filename: att.filename,
          content: att.content
        }));
      }

      const response = await this.transporter.sendMail(emailData);
      
      logger.info('Email sent successfully via SMTP', {
        messageId: response.messageId,
        to: to,
        subject: subject,
        from: fromAddress
      });

      return {
        success: true,
        messageId: response.messageId,
        provider: 'smtp',
        accepted: response.accepted,
        rejected: response.rejected
      };
    } catch (error) {
      logger.error('Failed to send email via SMTP:', error);
      throw error;
    }
  }

  // Load and compile email templates
  async getEmailTemplate(templateName, data = {}) {
    try {
      const templatePath = path.join(__dirname, '..', 'templates', 'emails', `${templateName}.hbs`);
      
      // Check cache first
      const cacheKey = `${templateName}_${JSON.stringify(data)}`;
      if (this.templateCache.has(cacheKey)) {
        return this.templateCache.get(cacheKey);
      }

      // Read template file
      const templateContent = await fs.readFile(templatePath, 'utf8');
      
      // Compile template
      const template = handlebars.compile(templateContent);
      const compiledHtml = template(data);
      
      // Cache the result
      this.templateCache.set(cacheKey, compiledHtml);
      
      return compiledHtml;
    } catch (error) {
      logger.error(`Failed to load template ${templateName}:`, error);
      throw new Error(`Template ${templateName} not found or failed to compile`);
    }
  }

  // Send OTP verification email
  async sendOTPEmail({ email, customerName, otpCode, expiryMinutes = 10 }) {
    try {
      const shopInfo = await this.getShopInfo();
      
      const html = await this.getEmailTemplate('otp-verification', {
        customerName,
        otpCode,
        expiryMinutes,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `${otpCode} - Your Verification Code | ${shopInfo.name}`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send OTP email:', error);
      throw error;
    }
  }

  // Send appointment confirmation email
  async sendAppointmentConfirmation({ 
    email, 
    customer, 
    appointment, 
    services, 
    barber, 
    confirmationNumber
  }) {
    try {
      const shopInfo = await this.getShopInfo();
      
      // Calculate total price from services
      const totalPrice = services.reduce((sum, service) => sum + parseFloat(service.price || 0), 0);
      
      const html = await this.getEmailTemplate('appointment-confirmation', {
        customer,
        appointment,
        services,
        barber,
        confirmationNumber,
        totalPrice,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `Appointment Confirmed - ${confirmationNumber} | ${shopInfo.name}`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send appointment confirmation:', error);
      throw error;
    }
  }

  // Send appointment reminder email
  async sendAppointmentReminder({ 
    email, 
    customer, 
    appointment, 
    services,
    barber, 
    confirmationNumber
  }) {
    try {
      const shopInfo = await this.getShopInfo();
      
      const html = await this.getEmailTemplate('appointment-reminder', {
        customer,
        appointment,
        services,
        barber,
        confirmationNumber,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `Reminder: Your Appointment in 1 Hour | ${shopInfo.name}`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send appointment reminder:', error);
      throw error;
    }
  }

  // Send appointment cancellation email
  async sendAppointmentCancellation({ 
    email, 
    customer, 
    appointment, 
    services, 
    barber, 
    confirmationNumber,
    reason = 'Cancelled by staff'
  }) {
    try {
      const shopInfo = await this.getShopInfo();
      
      const html = await this.getEmailTemplate('appointment-cancellation', {
        customer,
        appointment,
        services,
        barber,
        confirmationNumber,
        reason,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `Appointment Cancelled - ${confirmationNumber} | ${shopInfo.name}`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send appointment cancellation:', error);
      throw error;
    }
  }

  // Send review request email after appointment completion
  async sendReviewRequest({ 
    email, 
    customer,
    appointment,
    services,
    barber,
    reviewToken
  }) {
    try {
      const shopInfo = await this.getShopInfo();
      // Remove trailing slash from website URL to prevent double slashes
      const baseUrl = shopInfo.website.replace(/\/$/, '');
      const reviewLink = `${baseUrl}/submit-review?token=${reviewToken}`;
      
      const html = await this.getEmailTemplate('review-request', {
        customer,
        appointment,
        services,
        barber,
        reviewLink,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `How was your visit to ${shopInfo.name}?`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send review request email:', error);
      throw error;
    }
  }

  // Send welcome email to new customers
  async sendWelcomeEmail({ email, customerName }) {
    try {
      const shopInfo = await this.getShopInfo();
      
      const html = await this.getEmailTemplate('customer-welcome', {
        customerName,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `Welcome to ${shopInfo.name}!`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      throw error;
    }
  }

  // Send appointment notification to barber
  async sendBarberAppointmentNotification({
    email,
    barber,
    customer,
    appointment,
    services,
    confirmationNumber
  }) {
    try {
      const shopInfo = await this.getShopInfo();
      
      const html = await this.getEmailTemplate('barber-appointment-notification', {
        barber,
        customer,
        appointment,
        services,
        confirmationNumber,
        shopInfo
      });

      return await this.sendEmail({
        to: email,
        subject: `New Appointment Booked - ${customer.name}`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send barber appointment notification email:', error);
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordReset({ email, customerName, resetToken, resetUrl }) {
    try {
      const html = await this.getEmailTemplate('password-reset', {
        customerName,
        resetToken,
        resetUrl,
        expiryHours: 24,
        shopInfo: {
          name: process.env.SHOP_NAME || 'Barbershop Management',
          email: process.env.SHOP_EMAIL || 'contact@barbershop.com'
        }
      });

      return await this.sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: html
      });
    } catch (error) {
      logger.error('Failed to send password reset email:', error);
      throw error;
    }
  }

  // Send welcome email to new barbers
  async sendBarberWelcome({ email, barberName, tempPassword, loginUrl }) {
    try {
      const html = await this.getEmailTemplate('barber-welcome', {
        barberName,
        tempPassword,
        loginUrl,
        shopInfo: {
          name: process.env.SHOP_NAME || 'Barbershop Management',
          managerName: process.env.MANAGER_NAME || 'Shop Manager',
          email: process.env.SHOP_EMAIL || 'contact@barbershop.com',
          phone: process.env.SHOP_PHONE || ''
        }
      });

      return await this.sendEmail({
        to: email,
        subject: `Welcome to the Team - ${process.env.SHOP_NAME || 'Barbershop Management'}`,
        html: html
      });
    } catch (error) {
      logger.error('Failed to send barber welcome email:', error);
      throw error;
    }
  }

  // Queue bulk emails for mass campaigns
  async queueBulkEmails(emails) {
    try {
      const queuedEmails = emails.map(email => ({
        ...email,
        id: Date.now() + Math.random(),
        status: 'queued',
        attempts: 0,
        queuedAt: new Date()
      }));

      this.emailQueue.push(...queuedEmails);
      
      logger.info(`Queued ${queuedEmails.length} emails for bulk sending`);
      
      // Start processing if not already running
      if (!this.isProcessingQueue) {
        this.processBulkQueue();
      }

      return {
        success: true,
        queued: queuedEmails.length,
        queueSize: this.emailQueue.length
      };
    } catch (error) {
      logger.error('Failed to queue bulk emails:', error);
      throw error;
    }
  }

  // Process bulk email queue
  async processBulkQueue() {
    if (this.isProcessingQueue || this.emailQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;
    const batchSize = 5; // Process 5 emails at a time to stay under 150/hour limit
    const delay = 2000; // 2 seconds delay between batches (SMTP rate limits - 150/hour = 2.5/minute)

    try {
      while (this.emailQueue.length > 0) {
        const batch = this.emailQueue.splice(0, batchSize);
        
        const promises = batch.map(async (emailData) => {
          try {
            let html;
            if (emailData.templateName) {
              html = await this.getEmailTemplate(emailData.templateName, emailData.templateData);
            } else {
              html = emailData.html;
            }

            const result = await this.sendEmail({
              to: emailData.to,
              subject: emailData.subject,
              html: html,
              text: emailData.text,
              attachments: emailData.attachments
            });

            emailData.status = 'sent';
            emailData.sentAt = new Date();
            emailData.result = result;
            
            return { success: true, email: emailData };
          } catch (error) {
            emailData.attempts++;
            emailData.lastError = error.message;
            
            if (emailData.attempts < 3) {
              emailData.status = 'retry';
              this.emailQueue.push(emailData); // Re-queue for retry
            } else {
              emailData.status = 'failed';
            }
            
            return { success: false, email: emailData, error: error.message };
          }
        });

        const results = await Promise.allSettled(promises);
        
        const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
        const failed = results.filter(r => r.status === 'rejected' || !r.value.success).length;
        
        logger.info(`Bulk email batch processed: ${successful} sent, ${failed} failed`);
        
        // Delay between batches to respect Resend rate limits
        if (this.emailQueue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    } catch (error) {
      logger.error('Error processing bulk email queue:', error);
    } finally {
      this.isProcessingQueue = false;
    }
  }

  // Get queue status
  getQueueStatus() {
    return {
      queueSize: this.emailQueue.length,
      isProcessing: this.isProcessingQueue,
      cacheSize: this.templateCache.size
    };
  }

  // Clear template cache
  clearTemplateCache() {
    this.templateCache.clear();
    logger.info('Email template cache cleared');
  }
}

// Create and export singleton instance
const emailService = new EmailService();
module.exports = emailService;
