const CustomAPIError = require("./CustomAPIError");
const BadRequest = require('./bad-error')
const unauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const unauthorizedError = require('./unauthorized')
module.exports = {
    CustomAPIError,
    BadRequest,
    unauthenticatedError,
    NotFoundError,
    unauthorizedError
}