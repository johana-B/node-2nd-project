const CustomAPIError = require('./CustomAPIError')
const {StatusCodes} = require('http-status-codes')
class NotFoundError extends CustomAPIError{
    constructor (message){
        super(message);
        this.stausCode = StatusCodes.NOT_FOUND;
    };
};

module.exports = NotFoundError