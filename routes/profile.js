const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../models/Profile');
const User = require('../models/User');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const errors = {}; 
  
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
}
);

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const profileFields = {};    
    profileFields.user = req.user.id
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.handle) profileFields.handle = req.body.handle;

        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

    profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
              // Update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
              ).then(profile => res.json(profile));
            } else {
              // Create
      
              // Check if handle exists
              Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if (profile) {
                  errors.handle = 'That handle already exists';
                  res.status(400).json(errors);
                }
      
                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
              });
            }
        });
});


module.exports = router;