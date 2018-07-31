const express = require('express');
const router = express.Router();

const meetups = require('./meetups');
const guests = require('./guests');
const users = require('./users');

router.use(meetups);
router.use(guests);
router.use(users);

module.exports = router;