const express = require('express');
const router = express.Router();
const { getHolidays } = require('../controllers/holidayController');

router.get('/:year', getHolidays);

module.exports = router;