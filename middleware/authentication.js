const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new CustomError.unauthenticatedError('authentication invalid')
    }
    try {
        const { firstName, lastName, email, userId, role, image } = isTokenValid({ token });
        req.user = { userId, email, firstName, lastName, role, image };
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