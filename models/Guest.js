const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

const Guest = mongoose.model('Guest', GuestSchema, 'guests');

module.exports = Guest;