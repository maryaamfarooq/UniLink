const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      min: 3,
      max: 50,
    },
    email: {
          type: String,
          required: [true, 'Please provide email'],
          match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(student\.nust\.edu\.pk)|(seecs\.edu\.pk)$/,
            'Please enter a valid email provided by NUST',
          ],
          unique: true,
        },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      min: 6,
    },
    department:{
      type: String,
      required: [true, 'Please provide department'],
      enum: ['SEECS (School of Electrical Engineering and Computer Science)', 'SMME (School of Mechanical and Manufacturing Engineering)', 'NICE (Nust Institute of Civil Engineering', 'SADA (School of Art Design and Architecture', 'S3H (School of Social Sciences and Humanities)', 'SCME (School of Chemical and Materials Engineering)', 'NBS (Nust Business School)', 'ASAB (Atta Ur Rehman School of Applied Biosciences)', 'NSTP (National Science and Technology Park)', 'RIMMS (Research Institute for Microwave and Milimeter-Wave Studies)', 'IAEC', 'SNS (School of Natural Sciences)', 'IGIS (Institue of Geographical Information Systems)'],
    },
    batch:{
      type: Number,
      enum: [1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    jobsSaved: {
      type: Array,
      default: [],
    },
    // relationship: {
    //   type: Number,
    //   enum: [1, 2, 3],
    // },
  },
  { timestamps: true }
);



UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
