const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  //const {email, password} = req.body;
  const user = await User.create({ ...req.body })
  console.log(req.body);
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ email: user.email , firstName: user.firstName, lastName: user.lastName, token })
  //res.status(200).send({email, password});
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    //throw new UnauthenticatedError('Invalid Credentials')
    //res.status(StatusCodes.BAD_REQUEST).json({})
    res.json({});
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    //throw new UnauthenticatedError('Invalid Credentials')
    //res.status(StatusCodes.BAD_REQUEST).json({})
    res.json({});
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ email: user.email , firstName: user.firstName, lastName: user.lastName, token })
}

module.exports = {
  register,
  login,
}
