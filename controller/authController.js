const User = require('../model/userModel');
const Instractor = require('../model/instructorModel')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, age, gender } = req.body

    const isFIrstAccount = await User.countDocuments({}) === 0;
    const role = isFIrstAccount ? 'admin' : 'user';
    const user = await User.create(
        {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            age,
            gender,
            role
        })
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

const createInstractor = async (req, res) => {
    const fileName = req.file.filename;

    let instractor = new Instractor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        educationStatus: req.body.educationStatus,
        courseToOffer: req.body.courseToOffer,
        address: req.body.address,
        experience: req.body.experience,
        age: req.body.age,
        gender: req.body.gender,
        image: `/uploads/${fileName}`
    })

    const instractors = await instractor.save()
    const tokenUser = createTokenUser(instractors);
    res.status(StatusCodes.CREATED).json({ instractor: tokenUser });
};

const instractorLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequest('email and password can not be empty');
    };
    const user = await Instractor.findOne({ email })
    if (!user) {
        throw new CustomError.NotFoundError('invalid crediential');
    };
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.NotFoundError('invalid credential');
    };
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ instractor: tokenUser });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequest('email and password can not be empty');
    };
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.NotFoundError('invalid crediential');
    };
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.NotFoundError('invalid credential');
    };
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json('user logged out!');
};


module.exports = {
    register,
    createInstractor,
    login,
    instractorLogin,
    logout

}