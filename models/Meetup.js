const mongoose = require('mongoose')
const MeetupSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: Date, required: true},
  createdAt: {type: Date, default: Date.now }
})

const Meetup = mongoose.model('Meetup', MeetupSchema, 'meetups')

module.exports = Meetup