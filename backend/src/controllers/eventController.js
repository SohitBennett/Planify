const Event = require('../models/Event');

// @desc    Get all events for a user
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
  try {
    const { start, end } = req.query;
    
    let query = { user: req.user._id };
    
    // Filter by date range if provided
    if (start && end) {
      query.start = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const events = await Event.find(query).sort({ start: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Make sure user owns the event
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  try {
    const { title, description, start, end, allDay, color, location, recurring, reminders } = req.body;

    // Validate required fields
    if (!title || !start || !end) {
      return res.status(400).json({ message: 'Please provide title, start, and end time' });
    }

    // Validate start and end times
    if (new Date(start) >= new Date(end)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    const event = await Event.create({
      user: req.user._id,
      title,
      description,
      start,
      end,
      allDay,
      color,
      location,
      recurring,
      reminders,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Make sure user owns the event
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Validate start and end times if provided
    const start = req.body.start || event.start;
    const end = req.body.end || event.end;
    
    if (new Date(start) >= new Date(end)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Make sure user owns the event
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};