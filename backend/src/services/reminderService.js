const cron = require('node-cron');
const Event = require('../models/Event');
const User = require('../models/User');
const { sendEventReminder } = require('./emailService');

// Store sent reminders to avoid duplicates
const sentReminders = new Set();

// Check for upcoming events and send reminders
const checkReminders = async () => {
  try {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Find all events starting within the next hour
    const upcomingEvents = await Event.find({
      start: {
        $gte: now,
        $lte: oneHourFromNow,
      },
    }).populate('user', 'email name');

    for (const event of upcomingEvents) {
      // Skip if no reminders configured
      if (!event.reminders || event.reminders.length === 0) {
        continue;
      }

      const eventStartTime = new Date(event.start);
      const minutesUntilEvent = Math.floor(
        (eventStartTime - now) / (1000 * 60)
      );

      // Check each reminder
      for (const reminder of event.reminders) {
        const reminderKey = `${event._id}-${reminder.minutes}`;

        // Skip if already sent
        if (sentReminders.has(reminderKey)) {
          continue;
        }

        // Check if it's time to send this reminder
        if (minutesUntilEvent <= reminder.minutes && minutesUntilEvent > 0) {
          console.log(
            `📧 Sending ${reminder.minutes}-minute reminder for: ${event.title}`
          );

          // Send email reminder
          if (reminder.method === 'email' && event.user.email) {
            await sendEventReminder(
              event.user.email,
              event,
              reminder.minutes
            );
          }

          // Mark as sent
          sentReminders.add(reminderKey);

          // Clean up old reminders (older than 1 hour)
          setTimeout(() => {
            sentReminders.delete(reminderKey);
          }, 60 * 60 * 1000);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error checking reminders:', error);
  }
};

// Initialize the reminder service
const startReminderService = () => {
  console.log('🔔 Starting reminder service...');

  // Run every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log('⏰ Checking for reminders...');
    checkReminders();
  });

  // Also run on startup
  checkReminders();

  console.log('✅ Reminder service started (checking every 5 minutes)');
};

module.exports = {
  startReminderService,
  checkReminders,
};