// App.js
// Handles the main server functionality.

// Pull in modules using require.
const http = require('http');
const url = require('url');
// const query = require('querystring');
const fs = require('fs');

// Pull in handler files.
const index = fs.readFileSync(`${__dirname}/../hosted/index.html`);
const style = fs.readFileSync(`${__dirname}/../hosted/style.css`);

// Set the port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const respond = (req, res, status, type, body) => {
  res.writeHead(status, { 'Content-Type': type });
  res.write(body);
  res.end();
};

const getIndex = (req, res) => {
  respond(req, res, 200, 'text/html', index);
};

const getStyle = (req, res) => {
  respond(req, res, 200, 'text/css', style);
};

// Set up the URL routes.
const routes = {
  '/': getIndex,
  '/style.css': getStyle,
};

/**
 * @function onRequest Function to handle request sent to server.
 * @param {Request} req The request object returned by the HTTP server.
 * @param {Response} res The response object returned by the HTTP server.
 */
const onRequest = (req, res) => {
  const parsedURL = url.parse(req.url);
  // const types = req.headers.accept.split(',');
  // const params = query.parse(parsedURL.query);
  // const { method } = req;

  if (routes[parsedURL.pathname]) {
    routes[parsedURL.pathname](req, res);
  }
};

// Set up the server.
http.createServer(onRequest).listen(port);

// Development message to check to see if server started successfully.
console.log(`Listening on 127.0.0.1: ${port}`);
