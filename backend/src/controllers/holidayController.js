// Indian National Holidays (static data)
// Using static data to avoid API rate limits and ensure reliability

const getIndianHolidays = (year) => {
  // This is a simplified version. You can enhance it with actual API calls
  const holidays = {
    2024: [
      { date: '2024-01-26', name: 'Republic Day', type: 'national' },
      { date: '2024-03-08', name: 'Maha Shivaratri', type: 'religious' },
      { date: '2024-03-25', name: 'Holi', type: 'religious' },
      { date: '2024-03-29', name: 'Good Friday', type: 'religious' },
      { date: '2024-04-11', name: 'Eid al-Fitr', type: 'religious' },
      { date: '2024-04-17', name: 'Ram Navami', type: 'religious' },
      { date: '2024-04-21', name: 'Mahavir Jayanti', type: 'religious' },
      { date: '2024-05-23', name: 'Buddha Purnima', type: 'religious' },
      { date: '2024-06-17', name: 'Eid al-Adha', type: 'religious' },
      { date: '2024-07-17', name: 'Muharram', type: 'religious' },
      { date: '2024-08-15', name: 'Independence Day', type: 'national' },
      { date: '2024-08-26', name: 'Janmashtami', type: 'religious' },
      { date: '2024-09-16', name: 'Milad un-Nabi', type: 'religious' },
      { date: '2024-10-02', name: 'Gandhi Jayanti', type: 'national' },
      { date: '2024-10-12', name: 'Dussehra', type: 'religious' },
      { date: '2024-10-31', name: 'Diwali', type: 'religious' },
      { date: '2024-11-01', name: 'Diwali (Second Day)', type: 'religious' },
      { date: '2024-11-15', name: 'Guru Nanak Jayanti', type: 'religious' },
      { date: '2024-12-25', name: 'Christmas', type: 'religious' },
    ],
    2025: [
      { date: '2025-01-26', name: 'Republic Day', type: 'national' },
      { date: '2025-02-26', name: 'Maha Shivaratri', type: 'religious' },
      { date: '2025-03-14', name: 'Holi', type: 'religious' },
      { date: '2025-03-30', name: 'Eid al-Fitr', type: 'religious' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'religious' },
      { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'religious' },
      { date: '2025-04-18', name: 'Good Friday', type: 'religious' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'religious' },
      { date: '2025-06-07', name: 'Eid al-Adha', type: 'religious' },
      { date: '2025-07-06', name: 'Muharram', type: 'religious' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'religious' },
      { date: '2025-09-05', name: 'Milad un-Nabi', type: 'religious' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national' },
      { date: '2025-10-02', name: 'Dussehra', type: 'religious' },
      { date: '2025-10-20', name: 'Diwali', type: 'religious' },
      { date: '2025-10-21', name: 'Diwali (Second Day)', type: 'religious' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'religious' },
      { date: '2025-12-25', name: 'Christmas', type: 'religious' },
    ],
    2026: [
      { date: '2026-01-26', name: 'Republic Day', type: 'national' },
      { date: '2026-02-16', name: 'Maha Shivaratri', type: 'religious' },
      { date: '2026-03-03', name: 'Holi', type: 'religious' },
      { date: '2026-03-20', name: 'Eid al-Fitr', type: 'religious' },
      { date: '2026-03-26', name: 'Ram Navami', type: 'religious' },
      { date: '2026-03-30', name: 'Mahavir Jayanti', type: 'religious' },
      { date: '2026-04-03', name: 'Good Friday', type: 'religious' },
      { date: '2026-05-01', name: 'Buddha Purnima', type: 'religious' },
      { date: '2026-05-27', name: 'Eid al-Adha', type: 'religious' },
      { date: '2026-06-25', name: 'Muharram', type: 'religious' },
      { date: '2026-08-05', name: 'Janmashtami', type: 'religious' },
      { date: '2026-08-15', name: 'Independence Day', type: 'national' },
      { date: '2026-08-26', name: 'Milad un-Nabi', type: 'religious' },
      { date: '2026-09-21', name: 'Dussehra', type: 'religious' },
      { date: '2026-10-02', name: 'Gandhi Jayanti', type: 'national' },
      { date: '2026-10-09', name: 'Diwali', type: 'religious' },
      { date: '2026-10-10', name: 'Diwali (Second Day)', type: 'religious' },
      { date: '2026-11-24', name: 'Guru Nanak Jayanti', type: 'religious' },
      { date: '2026-12-25', name: 'Christmas', type: 'religious' },
    ],
  };

  return holidays[year] || [];
};

// @desc    Get Indian holidays for a year
// @route   GET /api/holidays/:year
// @access  Public
const getHolidays = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    
    if (isNaN(year) || year < 2024 || year > 2026) {
      return res.status(400).json({ 
        message: 'Invalid year. Please provide a year between 2024 and 2026' 
      });
    }

    const holidays = getIndianHolidays(year);
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHolidays,
};