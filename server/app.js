// App.js
// Handles the main server functionality.

// Pull in modules using 'require'.
const http = require('http');
const url = require('url');
const query = require('querystring');

// Pull in handler files.
const responseHandler = require('./responseHandler.js');
const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

// Set the port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Key:value pairs indicating URL routes.
const routes = {
  POST: {

  },
  GET: {
    '/': htmlHandler.getIndex,
    '/index': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
  },
  HEAD: {
    
  },
  notFound: jsonHandler.getNotFound,
};

// Request call back functions.

// Handle post.
const handlePost = (req, res, parsedURL, types) => {
  // Check if the parsed name matches anything in our URL object.
  // Otherwise, call the default function.
  if (routes.POST[parsedURL.pathname]) {
    console.log(`Found POST route for "${parsedURL.pathname}".`);
    const callback = routes.POST[parsedURL.pathname];
    responseHandler.handlePost(req, res, types, callback);
  }
};

// Handle get.
const handleGet = (req, res, parsedURL, types, params) => {
  // Check if the parsed name matches anything in our URL object.
  // Otherwise, call the default function.
  console.dir(routes.GET);
  if (routes.GET[parsedURL.pathname]) {
    console.log(`Found GET route for "${parsedURL.pathname}".`);
    routes.GET[parsedURL.pathname](req, res, types, params);
  } else {
    console.log(`Route "${parsedURL.pathname}" not found. Check for errors.`);
    routes.notFound(req, res, types);
  }
};

// Handle head.
const handleHead = (req, res, parsedURL, types, params) => {
  // Check if the parsed name matches anything in our URL object.
  // Otherwise, call the default function.
  if (routes.HEAD[parsedURL.pathname]) {
    console.log(`Found HEAD route for "${parsedURL.pathname}".`);
    routes.HEAD[parsedURL.pathname](req, res, types, params);
  } else {
    console.log(`Route "${parsedURL.pathname}" not found. Check for errors.`);
    routes.notFound(req, res, types);
  }
};

/**
 * @function onRequest Function to handle request sent to server.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 */
const onRequest = (req, res) => {
  // Print the URL requests that the server may receive.
  console.groupCollapsed('onRequest called.');

  // Perform server logic here.
  console.groupCollapsed('Request metadata.');

  // Parse the URL using the URL module.
  const parsedURL = url.parse(req.url);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Pathname: ${parsedURL.pathname}`);

  // Grab the Accept headers and split them into an array.
  const types = req.headers.accept.split(',');
  if (types.length) {
    console.log(`Request Accept Headers: ${types.length} accept header(s).`);
    console.dir(types);
  }

  // Grab the query parameters and parse them.
  const params = query.parse(parsedURL.query);
  if (parsedURL.query) {
    console.log(`Request params: ${parsedURL.query.length} param(s).`);
    console.dir(params);
  }

  // Grab the request method.
  const { method } = req;
  console.log(`Request method: ${method}`);
  console.groupEnd();

  if (routes[method]) {
    console.log(`Server: ${method} request received.`);
    if (method === 'POST') {
      handlePost(req, res, parsedURL, types);
    }
    if (method === 'GET') {
      handleGet(req, res, parsedURL, types, params);
    }
    if (method === 'HEAD') {
      handleHead(req, res, parsedURL, types, params);
    }
  } else {
    console.log(`Server: ${method} not valid.`);
    handleGet(req, res, parsedURL, types, params);
  }

  console.groupEnd();
};

// Start the server, set the callback, and start listening on the port.
http.createServer(onRequest).listen(port);

// Development message to check to see if server started successfully.
console.log(`Listening on 127.0.0.1: ${port}`);

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
