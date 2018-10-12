/*
  DataObjects.js
  This file contains functions to create JSON and XML response objects.
*/

/**
 * @function JSONObject Create an JS object that hasn't been stringified.
 * @param {String} message Message contained by object.
 * @param {String} id Status code name.
 */
const JSONObject = (message, id) => ({ message, id });

/**
 * @function XMLObject Create an XML string with a status message and status code.
 * @param {String} message Message contained by object.
 * @param {String} id Status code name.
 */
const XMLObject = (message, id) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${message}</message>`;
  responseXML = `${responseXML} <id>${id}</id>`;
  responseXML = `${responseXML} </response>`;
  return responseXML;
};

/**
 * @function CreateDataObject Create a data object based off of input parameters.
 * @param {String} message Message contained by object.
 * @param {String} id Status code name.
 * @param {String} type Type of object to create. (JSON by default).
 */
const CreateDataObject = (message, id, type) => {
  if (type === 'text/xml') {
    return XMLObject(message, id);
  }
  return JSONObject(message, id);
};

// Public exports of functions.
module.exports = {
  JSONObject,
  XMLObject,
  DataObject: CreateDataObject,
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
