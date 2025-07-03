import sgMail from '@sendgrid/mail';

// SendGrid Configuration
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Email Templates
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to GoSellr!',
    templateId: 'd-welcome-template-id',
  },
  orderConfirmation: {
    subject: 'Order Confirmation - GoSellr',
    templateId: 'd-order-confirmation-template-id',
  },
  passwordReset: {
    subject: 'Password Reset - GoSellr',
    templateId: 'd-password-reset-template-id',
  },
  orderShipped: {
    subject: 'Your Order Has Been Shipped!',
    templateId: 'd-order-shipped-template-id',
  },
};

// Email Functions
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM!,
      templateId: emailTemplates.welcome.templateId,
      dynamicTemplateData: {
        name,
        loginUrl: `${process.env.NEXTAUTH_URL}/login`,
      },
    };

    await sgMail.send(msg);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Welcome email failed:', error);
    throw error;
  }
};

export const sendOrderConfirmation = async (email: string, orderData: any) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM!,
      templateId: emailTemplates.orderConfirmation.templateId,
      dynamicTemplateData: {
        orderNumber: orderData.orderNumber,
        total: orderData.total,
        items: orderData.items,
        trackingUrl: `${process.env.NEXTAUTH_URL}/orders/${orderData.id}`,
      },
    };

    await sgMail.send(msg);
    console.log('Order confirmation sent to:', email);
  } catch (error) {
    console.error('Order confirmation failed:', error);
    throw error;
  }
};

export const sendPasswordReset = async (email: string, resetToken: string) => {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM!,
      templateId: emailTemplates.passwordReset.templateId,
      dynamicTemplateData: {
        resetUrl,
        expiryTime: '1 hour',
      },
    };

    await sgMail.send(msg);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Password reset email failed:', error);
    throw error;
  }
};

export const sendOrderShipped = async (email: string, orderData: any) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM!,
      templateId: emailTemplates.orderShipped.templateId,
      dynamicTemplateData: {
        orderNumber: orderData.orderNumber,
        trackingNumber: orderData.trackingNumber,
        carrier: orderData.carrier,
        estimatedDelivery: orderData.estimatedDelivery,
      },
    };

    await sgMail.send(msg);
    console.log('Order shipped notification sent to:', email);
  } catch (error) {
    console.error('Order shipped notification failed:', error);
    throw error;
  }
};
