const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MeetupSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: Date, required: true},
  createdAt: {type: Date, default: Date.now },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
  
],
  comments: [
      {
       
    }
  ],
  likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
})

MeetupSchema.statics.registerUserById = function(meetupId,userId) {
  return Meetup.findByIdAndUpdate(meetupId, {
    $addToSet:
      { 
        'users': userId
      }
  },
      {
        new: true
      }
  )
}

MeetupSchema.statics.unregisterUserById = function(meetupId,userId) {
  return Meetup.findByIdAndUpdate(meetupId, {
    $pull:
      { 
        'users': userId
      }
  },
      {
        new: true
      }
  )
}

MeetupSchema.statics.addCommentByUser = function(meetupId,userId) {
  return Meetup.findByIdAndUpdate(meetupId, {
    $push:
      { 
        'users': userId
      }
  },
      {
        new: true
      }
  )
}

MeetupSchema.statics.addLikeByUser = function(meetupId,userId) {
  return Meetup.findByIdAndUpdate(meetupId, {
    $addToSet:
      { 
        'likes': userId
      }
  },
      {
        new: true
      }
  )
}

const Meetup = mongoose.model('Meetup', MeetupSchema, 'meetups')


module.exports = Meetup