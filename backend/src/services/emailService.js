const nodemailer = require('nodemailer');

// Create reusable transporter
let transporter = null;

const createTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

// Send event reminder email
const sendEventReminder = async (userEmail, event, minutesBefore) => {
  try {
    const transporter = createTransporter();

    const eventDate = new Date(event.start);
    const formattedDate = eventDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = event.allDay
      ? 'All day'
      : eventDate.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        });

    const mailOptions = {
      from: `"Planify Reminder" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Reminder: ${event.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .event-card {
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin: 20px 0;
            }
            .event-title {
              font-size: 24px;
              font-weight: bold;
              color: #2d3748;
              margin-bottom: 15px;
            }
            .event-detail {
              display: flex;
              align-items: center;
              margin: 10px 0;
              color: #4a5568;
            }
            .icon {
              width: 20px;
              margin-right: 10px;
            }
            .description {
              background: #edf2f7;
              padding: 15px;
              border-radius: 6px;
              margin-top: 15px;
              color: #4a5568;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #718096;
              font-size: 14px;
            }
            .color-indicator {
              width: 4px;
              height: 60px;
              background-color: ${event.color};
              position: absolute;
              left: 0;
              top: 20px;
              border-radius: 2px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;"> Event Reminder</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">
              ${minutesBefore > 60 
                ? `${Math.floor(minutesBefore / 60)} hour${Math.floor(minutesBefore / 60) > 1 ? 's' : ''} before` 
                : `${minutesBefore} minutes before`}
            </p>
          </div>
          
          <div class="content">
            <div class="event-card" style="position: relative; padding-left: 25px;">
              <div class="color-indicator"></div>
              
              <div class="event-title">${event.title}</div>
              
              <div class="event-detail">
                <span class="icon">📅</span>
                <strong>${formattedDate}</strong>
              </div>
              
              <div class="event-detail">
                <span class="icon">🕐</span>
                <strong>${formattedTime}</strong>
              </div>
              
              ${event.location ? `
                <div class="event-detail">
                  <span class="icon">📍</span>
                  <span>${event.location}</span>
                </div>
              ` : ''}
              
              ${event.description ? `
                <div class="description">
                  <strong>Description:</strong><br/>
                  ${event.description}
                </div>
              ` : ''}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/calendar" 
                 style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 6px; font-weight: bold;">
                View in Calendar
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated reminder from your Calendar app.</p>
            <p style="color: #a0aec0; font-size: 12px;">
              You're receiving this because you set a reminder for this event.
            </p>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✉️  Reminder email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email service is ready');
    return true;
  } catch (error) {
    console.error('❌ Email service error:', error.message);
    return false;
  }
};

module.exports = {
  sendEventReminder,
  testEmailConfig,
};