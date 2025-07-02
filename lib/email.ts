import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Email configuration
const emailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@ehb-platform.com',
  replyTo: process.env.EMAIL_REPLY_TO || 'support@ehb-platform.com',
  providers: {
    resend: process.env.RESEND_API_KEY,
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },
};

// Initialize email providers
let transporter: nodemailer.Transporter | null = null;
let resend: Resend | null = null;

// Initialize SMTP transporter
if (emailConfig.providers.smtp.host && emailConfig.providers.smtp.auth.user) {
  transporter = nodemailer.createTransporter(emailConfig.providers.smtp);
}

// Initialize Resend
if (emailConfig.providers.resend) {
  resend = new Resend(emailConfig.providers.resend);
}

// Email templates
const emailTemplates = {
  welcome: (userName: string) => ({
    subject: 'Welcome to EHB Development Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Welcome to EHB Development Platform!</h1>
        <p>Hi ${userName},</p>
        <p>Thank you for joining our development platform. We're excited to have you on board!</p>
        <p>Here's what you can do with your account:</p>
        <ul>
          <li>Track your projects and milestones</li>
          <li>Monitor SLA compliance</li>
          <li>Access advanced analytics</li>
          <li>Manage AI agents</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The EHB Team</p>
      </div>
    `,
  }),

  projectUpdate: (projectName: string, status: string, userName: string) => ({
    subject: `Project Update: ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Project Update</h1>
        <p>Hi ${userName},</p>
        <p>Your project <strong>${projectName}</strong> has been updated to status: <strong>${status}</strong></p>
        <p>Log in to your dashboard to view the latest updates and take any necessary actions.</p>
        <p>Best regards,<br>The EHB Team</p>
      </div>
    `,
  }),

  slaAlert: (projectName: string, slaType: string, userName: string) => ({
    subject: `SLA Alert: ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #EF4444;">SLA Alert</h1>
        <p>Hi ${userName},</p>
        <p>This is an alert regarding your project <strong>${projectName}</strong>.</p>
        <p>The ${slaType} SLA threshold has been exceeded. Please review your project immediately.</p>
        <p>Log in to your dashboard to address this issue.</p>
        <p>Best regards,<br>The EHB Team</p>
      </div>
    `,
  }),

  passwordReset: (resetLink: string, userName: string) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Password Reset</h1>
        <p>Hi ${userName},</p>
        <p>You requested a password reset for your EHB Development Platform account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a>
        <p>If you didn't request this reset, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>Best regards,<br>The EHB Team</p>
      </div>
    `,
  }),

  contactForm: (formData: any) => ({
    subject: `New Contact Form Submission from ${formData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      </div>
    `,
  }),
};

// Email service class
export class EmailService {
  private static instance: EmailService;

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Send email using Resend (preferred)
  async sendWithResend(to: string, subject: string, html: string) {
    if (!resend) {
      throw new Error('Resend not configured');
    }

    try {
      const result = await resend.emails.send({
        from: emailConfig.from,
        to: [to],
        subject,
        html,
      });
      console.log('✅ Email sent via Resend:', result);
      return result;
    } catch (error) {
      console.error('❌ Resend email failed:', error);
      throw error;
    }
  }

  // Send email using SMTP (fallback)
  async sendWithSMTP(to: string, subject: string, html: string) {
    if (!transporter) {
      throw new Error('SMTP not configured');
    }

    try {
      const result = await transporter.sendMail({
        from: emailConfig.from,
        to,
        subject,
        html,
      });
      console.log('✅ Email sent via SMTP:', result);
      return result;
    } catch (error) {
      console.error('❌ SMTP email failed:', error);
      throw error;
    }
  }

  // Send email with automatic provider selection
  async sendEmail(to: string, subject: string, html: string) {
    try {
      // Try Resend first
      if (resend) {
        return await this.sendWithResend(to, subject, html);
      }
      // Fallback to SMTP
      else if (transporter) {
        return await this.sendWithSMTP(to, subject, html);
      } else {
        throw new Error('No email provider configured');
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
  }

  // Send welcome email
  async sendWelcomeEmail(to: string, userName: string) {
    const template = emailTemplates.welcome(userName);
    return await this.sendEmail(to, template.subject, template.html);
  }

  // Send project update email
  async sendProjectUpdateEmail(to: string, projectName: string, status: string, userName: string) {
    const template = emailTemplates.projectUpdate(projectName, status, userName);
    return await this.sendEmail(to, template.subject, template.html);
  }

  // Send SLA alert email
  async sendSLAAlertEmail(to: string, projectName: string, slaType: string, userName: string) {
    const template = emailTemplates.slaAlert(projectName, slaType, userName);
    return await this.sendEmail(to, template.subject, template.html);
  }

  // Send password reset email
  async sendPasswordResetEmail(to: string, resetLink: string, userName: string) {
    const template = emailTemplates.passwordReset(resetLink, userName);
    return await this.sendEmail(to, template.subject, template.html);
  }

  // Send contact form notification
  async sendContactFormEmail(to: string, formData: any) {
    const template = emailTemplates.contactForm(formData);
    return await this.sendEmail(to, template.subject, template.html);
  }

  // Test email configuration
  async testConnection() {
    try {
      if (resend) {
        await resend.emails.send({
          from: emailConfig.from,
          to: ['test@example.com'],
          subject: 'Test Email',
          html: '<p>This is a test email from EHB Platform</p>',
        });
        console.log('✅ Resend connection test successful');
        return true;
      } else if (transporter) {
        await transporter.verify();
        console.log('✅ SMTP connection test successful');
        return true;
      } else {
        console.log('❌ No email provider configured');
        return false;
      }
    } catch (error) {
      console.error('❌ Email connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();

// Export for direct use
export default emailService;
