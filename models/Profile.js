const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 30
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    education: [
        {
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        current: {
            type: Boolean,
            default: false
        }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', ProfileSchema, 'profiles');

module.exports = Profile;