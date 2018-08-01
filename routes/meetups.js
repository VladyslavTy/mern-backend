const express = require('express')
const router = express.Router()
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Meetup = require('../models/Meetup')

router.post('/meetups/:id/users', passport.authenticate('jwt', { session: false }), function (req, res) {
  Meetup.registerUserById(
    req.params.id,
    req.user._id
  )
    .then(meetup => res.status(200).json(meetup))
    .catch(err => res.status(500).json({ error: err }))
});

router.delete('/meetups/:id/users', passport.authenticate('jwt', { session: false }), function (req, res) {
  Meetup.unregisterUserById(
    req.params.id,
    req.user._id
  )
    .then(meetup => res.status(200).json(meetup))
    .catch(err => res.status(500).json({ error: err }))
});

router.put('/meetups/:id/like', passport.authenticate('jwt', { session: false }), function (res, req) {
  Meetup.addLikeByUser(
    req.params.id,
    req.user._id
  )
    .then(meetup => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/meetups', function (req, res) {
  Meetup.find()
    .then(meetups => res.json(meetups))
    .catch(err => res.status(500).json({ error: err }))
})

router.post('/meetups', function (req, res) {
  Meetup.create(req.body)
    .then(m => res.json(m))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/meetups/:id', function (req, res) {
  Meetup.findById(req.params.id)
    .then(m => res.json(m))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/meetups/:id', function (req, res) {
  Meetup.findByIdAndRemove(req.params.id)
    .then(m => res.status(204).json('OK'))
    .catch(err => res.status(500).json({ error: err }))
})

router.patch('/meetups/:id', function (req, res) {
  Meetup.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(m => res.json(m))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/meetups/:id/users', function (req, res) {
  Meetup.findById(req.params.id)
    .populate('users')
    .then(meetup => res.json(meetup.users))
    .catch(err => res.status(500).json({ error: err }))
})




module.exports = router