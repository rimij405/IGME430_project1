// JSONHandler.js
// This file contains JSON responses.

// Require statements.
const sc = require('./statusCodes.js');
const mt = require('./mimeTypes.js');
const data = require('./dataObjects.js');
const handler = require('./responseHandler.js');

// Handler functions.

/**
 * @function respondJSON Function to send a response JSON.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 * @param {StatusCode} status The response's status code.
 * @param {Object} object The JSON object to be stringified.
 */
const respondJSON = (req, res, status, object) => {
    const body = JSON.stringify(object);
    handler.respond(req, res, status, mt["json"], body);
};

/**
 * @function respondJSONMeta Function to send a response JSON metadata (without content body).
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 * @param {StatusCode} status The response's status code.
 */
const respondJSONMeta = (req, res, status) => {
    handler.respondMeta(req, res, status, mt["json"]);
};

/**
 * @function getNotFound Function that returns a not found JSON object.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 */
const getNotFound = (req, res) => {
    const message = 'The page you were looking for is not found.';
    const id = 'Not Found';
    const status = sc["404"];

    // Create the JSON object and return it.
    const responseJSON = data.JSONObject(message, id);
    responseJSON.status = status.code;

    // Respond.
    respondJSON(req, res, status, responseJSON);
};

// Public exports of handler functions.
module.exports = {
    respondJSON,
    respondJSONMeta,
    getNotFound
};

// License information.
/*
  Copyright 2018 Ian Effendi

  Permission is hereby granted, free of charge,
  to any person obtaining a copy of this software
  and associated documentation files (the "Software"),
  to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom
  the Software is furnished to do so, subject to the
  following conditions:

    The above copyright notice and this permission
    notice shall be included in all copies or
    substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/
