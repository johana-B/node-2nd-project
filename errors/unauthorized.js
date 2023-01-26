const CustomAPIError = require('./CustomAPIError')
const { StatusCodes } = require('http-status-codes')
class unauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.stausCode = StatusCodes.FORBIDDEN;
    };
};

module.exports = unauthorizedError