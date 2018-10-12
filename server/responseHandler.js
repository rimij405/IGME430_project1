// ResponseHandler.js
// This file handles general responses.

// Require statements.
const query = require('querystring');
const sc = require('./statusCodes.js');

/**
 * @function respond Function to send a response.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 * @param {StatusCode} status The response's status code.
 * @param {String} type The content's MIME-type.
 * @param {String} body The content string or buffer to be written.
 */
const respond = (req, res, status, type, body) => {
    // Set the status code and content type.
    res.writeHead(status.code, { 'Content-Type': type });
  
    // Write the content.
    res.write(body);
  
    console.groupCollapsed('Respond method called.');
    console.log(`Response status: ${status}. Response content type: ${type}`);
    // console.log(`Response body: ${body}`);
    console.groupEnd();
  
    // Send the response back.
    res.end();
};

/**
 * @function respondMeta Function to send a response metadata (without content body).
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 * @param {StatusCode} status The response's status code.
 * @param {String} type The content's MIME-type.
 */
const respondMeta = (req, res, status, type) => {
    // Set the status code and content type.
    res.writeHead(status.code, { 'Content-Type': type });

    console.groupCollapsed('Respond metadata method called.');
    console.log(`Response status: ${status}. Response content type: ${type}`);
    console.groupEnd();

    // Send the response back.
    res.end();
};

/**
 * @function handlePost Function to handle posts.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 * @param {String[]} types Accept headers.
 * @param {Callback} callback Function to call once post data is received.
 */
const handlePost = (req, res, types, callback) => {
    const body = [];

    req.on('error', (err) => {
        console.dir(err);
        respondMeta(req, res, sc["400"], "text/html");
    });

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);
        if(callback) { callback(req, res, types, bodyParams); }
    });
};

// Public exports of handler functions.
module.exports = {
    status,
    respond,
    respondMeta,
    handlePost
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