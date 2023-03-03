const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  //console.log(req.body);
  //const {email, password} = req.body
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  //console.log("registered");
  res.status(StatusCodes.CREATED).json({ user: { email: user.email }, token })
  //res.send(req.body);
  //res.status(200).send({email, password});
  //res.send('<h1>Connected to register</h1>')
}

const login = async (req, res) => {
  //console.log("starting logged in");
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  //console.log("logged in");
  res.status(StatusCodes.OK).json({ user: { email: user.email }, token })
}

module.exports = {
  register,
  login,
}
