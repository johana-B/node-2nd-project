const CustomAPIError = require('./CustomAPIError')
const {StatusCodes} = require('http-status-codes')
class unauthenticatedError extends CustomAPIError{
    constructor (message){
        super(message);
        this.stausCode = StatusCodes.UNAUTHORIZED;
    };
};

module.exports = unauthenticatedError