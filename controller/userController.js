const User = require('../model/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
    createTokenUser,
    attachCookiesToResponse, chechPermissions
} = require('../utils')

const getAllUsers = async (req, res) => {
    console.log(req.user);
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res) => {
    const { id: userId } = req.params
    const user = await User.findOne({ _id: userId }).select('-password');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${userId}`);
    }
    res.status(StatusCodes.OK).json({ user });
};
const getCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate({ _id: req.user.userId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new CustomError.NotFoundError(`no user with id ${userId}`);
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser, msg: 'user updated successfully' });
};

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequest('passwords can not be empty');
    };
    const user = await User.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.NotFoundError('invalid credential');
    }
    user.password = newPassword
    await user.save();
    res.status(StatusCodes.CREATED).json({ msg: 'password changed successfully' });
};

const deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new CustomError.NotFoundError(`no user with id ${userId}`)
    }
    chechPermissions(req.user, user._id);
    await user.remove();
    res.status(StatusCodes.OK).json({ msg: 'user delated successfully ' });
};

module.exports = {
    getAllUsers,
    getCurrentUser,
    getSingleUser,
    updateUser,
    updateUserPassword,
    deleteUser
}
