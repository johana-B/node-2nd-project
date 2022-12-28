const CustomAPIError = require("./CustomAPIError");
const BadRequest = require('./bad-error')
const unauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
module.exports = {
    CustomAPIError,
    BadRequest,
    unauthenticatedError,
    NotFoundError
}