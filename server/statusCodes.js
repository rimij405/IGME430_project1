// StatusCodes.js
// Exported status codes to use.

// Constructor for a status code.
function StatusCode(status, code) {
  this.status = status;
  this.code = code;
}

// Public export of codes.
module.exports = {
  "200": new StatusCode('Success - OK', 200),
  "201": new StatusCode('Success - Created', 201),
  "204": new StatusCode('Success - No Content', 204),
  "400": new StatusCode('Client Error - Bad Request', 400),
  "401": new StatusCode('Client Error - Unauthorized', 401),
  "403": new StatusCode('Client Error - Forbidden', 403),
  "404": new StatusCode('Client Error - Not Found', 404),
  "409": new StatusCode('Client Error - Conflict', 409),
  "500": new StatusCode('Server Error - Internal Server Error', 500),
};