const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateInstractor = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new CustomError.unauthenticatedError('authentication invalid')
    }
    try {
        const { firstName, lastName, email, gender, instractorId, role } = isTokenValid({ token });
        req.instractor = { instractorId, firstName, lastName, email, gender, role };
        next();
    } catch (error) {
        throw new CustomError.unauthenticatedError('authentication invalid')
    }

}

const autorizedInstractor = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.instractor.role)) {
            throw new CustomError.unauthenticatedError(
                'Unauthorized to access this route'
            );
        }
        next();
    };
};
module.exports = {
    authenticateInstractor,
    autorizedInstractor
}