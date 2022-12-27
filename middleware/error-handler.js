const CustomAPIError = require('../error/CustomAPIError');
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.send(err.StatusCode).json({msg: err.message});
    }
    return res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = errorHandlerMiddleware