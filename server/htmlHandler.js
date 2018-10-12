// HTMLHandler.js
// This file returns client webpages.

// Require statements.
const fs = require('fs'); // Require filesystem.
const mt = require('./mimeTypes.js');
const sc = require('./statusCodes.js');
const handler = require('./responseHandler.js');

// Resources to return.
const assets = {
    index: undefined,
    style: undefined
};

/**
 * @function getIndex Function to handle the index page.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 */
const getIndex = (req, res) => {
    assets.index = assets.index || fs.readFile(`${__dirname}/../hosted/index.html`);
    handler.respond(req, res, sc["200"], mt["html"], assets.index);
};

/**
 * @function getStyle Function to get the CSS style sheet.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 */
const getStyle = (req, res) => {
    assets.style = assets.style || fs.readFile(`${__dirname}/../hosted/style.css`);
    handler.respond(req, res, sc["200"], mt["css"], assets.style);
};

// Public exports of handler functions.
module.exports = {
    getIndex,
    getStyle
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