const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  keys = require('../config/keys');
const passport = require('passport');
const Guest = require('../models/Guest');

router.get('/guests', function(req, res) {
  Guest.find()
    .then(guests => res.json(guests))
    .catch(err => res.status(500).json({error: err}))
});
// need to refactoring
router.post('/guests/register', function (req, res) {
  Guest.findOne({email: req.body.email})
      .then(guest => {
        if(guest) {
            return res.status(400).json({email: 'Email already exist'});
        } else {
          const newGuest = new Guest({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newGuest.password, salt, (err, hash) => {
                  newGuest.password = hash;
                  newGuest.save()
                      .then(guest => res.json(guest))
                      .catch(err => console.error(err));
              })
          })
        }
      })

  /*Guest.create(req.body)
    .then(m => res.json(m))
    .catch(err => res.status(500).json({error: err}))*/
});

router.post('/guests/login/', function (req,res) {
    const email = req.body.email;
    const password = req.body.password;

    Guest.findOne({email})
        .then(guest => {

            if(!guest){
                return res.status(404).json({email: 'user not found'})
            }

            bcrypt.compare(password,guest.password)
                .then(isMatch => {
                    if(isMatch){

                        const payload = {id: guest._id, name: guest.name};

                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        return  res.status(404).json({password: 'password incorrect'})
                    }
                })
        })
});

router.get('/guests/current', passport.authenticate('jwt', {session: false}, (req, res) => {
    res.json(res);
}));

// end


router.delete('/guests/:id', function (req, res) {
  Guest.findByIdAndRemove(req.params.id)
    .then(m => res.status(204).json('OK'))
    .catch(err => res.status(500).json({error: err}))
});

router.patch('/guests/:id', function (req, res) {
  Guest.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(m => res.json(m))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;