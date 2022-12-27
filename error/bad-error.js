const CustomAPIError = require('./CustomAPIError')
const {StatusCodes} = require('http-status-codes')
class BadRequest extends CustomAPIError{
    constructor (message){
        super(message);
        this.stausCode = StatusCodes.BAD_REQUEST;
    };
};

module.exports = BadRequest