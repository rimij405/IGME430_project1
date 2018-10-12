// StatusCode.js
// Exported status codes to use.

// Constructor for a status code.
function StatusCode(status, code) {
    this.status = status;
    this.code = code;
};

// Collection of status codes.
let statuscodes = statuscodes || {};

statuscodes["200"] = new StatusCode("Success - OK", 200);
statuscodes["201"] = new StatusCode("Success - Created", 201);
statuscodes["204"] = new StatusCode("Success - No Content", 204);
statuscodes["400"] = new StatusCode("Client Error - Bad Request", 400);
statuscodes["401"] = new StatusCode("Client Error - Unauthorized", 401);
statuscodes["403"] = new StatusCode("Client Error - Forbidden", 403);
statuscodes["404"] = new StatusCode("Client Error - Not Found", 404);
statuscodes["409"] = new StatusCode("Client Error - Conflict", 409);
statuscodes["500"] = new StatusCode("Server Error - Internal Server Error", 500);

// Public export of codes.
module.exports = {
    statusCodes
};