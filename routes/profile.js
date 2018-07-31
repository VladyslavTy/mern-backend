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
    
    }
);







router.post('/users/register', function (req, res) {
    const {errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                errors.mail = 'Email already exist';
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.error(err));
                    })
                })
            }
        })
    /*Guest.create(req.body)
      .then(m => res.json(m))
      .catch(err => res.status(500).json({error: err}))*/
});

router.get('/users/current', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.post('/users/login', function (req,res) {
    const {errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {

            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors)
            }

            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {id: user.id, name: user.name};
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        errors.password = 'Password incorrect';
                        return  res.status(404).json(errors)
                    }
                })
        })
});



module.exports = router;