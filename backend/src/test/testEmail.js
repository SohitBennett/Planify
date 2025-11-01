require('dotenv').config();
const { sendEventReminder, testEmailConfig } = require('../services/emailService');

// Test email configuration
const runTests = async () => {
  console.log('🧪 Testing Email Service...\n');

  // Test 1: Check configuration
  console.log('Test 1: Checking email configuration...');
  const configTest = await testEmailConfig();
  if (!configTest) {
    console.log('❌ Email configuration failed! Check your .env file.\n');
    return;
  }
  console.log('✅ Email configuration successful!\n');

  // Test 2: Send test reminder
  console.log('Test 2: Sending test reminder email...');
  const testEvent = {
    title: 'Test Event - Email Reminder',
    start: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
    allDay: false,
    color: '#3b82f6',
    location: 'Conference Room A',
    description: 'This is a test email reminder from your Calendar app.',
  };

  const emailResult = await sendEventReminder(
    process.env.EMAIL_USER, // Send to yourself
    testEvent,
    15 // 15 minutes before
  );

  if (emailResult.success) {
    console.log(`✅ Test email sent successfully!`);
    console.log(`📧 Check ${process.env.EMAIL_USER} for the test reminder.\n`);
  } else {
    console.log('❌ Failed to send test email:', emailResult.error, '\n');
  }

  console.log('✨ Testing complete!');
  process.exit(0);
};

runTests();