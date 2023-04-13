const jwt = require('jsonwebtoken');
const CustomError = require('../errors');
// const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const authenticateUser = async (req, res, next) => {
    const Token = req.headers.authorization
    if (!Token || !Token.startsWith('Bearer')) {
        throw new CustomError.unauthenticatedError('Authentication invalid');
    }
    const token = Token.split(' ')[1]
    try {
        // console.log(token)
        const { firstName, lastName, email, userId, role, image } = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload)
        req.user = { firstName, lastName, email, userId, role, image }
        console.log(req.user)
        next();
    } catch (error) {
        throw new CustomError.unauthenticatedError('authentication invalid')
    }

}

const autorizedUser = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.unauthenticatedError(
                'Unauthorized to access this route'
            );
        }
        next();
    };
};
module.exports = {
    authenticateUser,
    autorizedUser
}