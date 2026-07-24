// server.js
//
// A minimal Node.js + Express tutorial application.
//
// This program starts an HTTP server that exposes a single endpoint:
//     GET /hello  ->  responds with the plain-text body "Hello world"
//
// The file is intentionally tiny so you can read it top to bottom and
// understand every line. Start it with `npm start` (which runs
// `node server.js`), then open http://localhost:3000/hello in a browser
// or query it with `curl http://localhost:3000/hello`.

'use strict';

// 1. Import the Express web framework.
//    Express is declared as a dependency in package.json ("express": "^5.2.1")
//    and installed into node_modules/ when you run `npm install`. We use
//    CommonJS `require(...)` because package.json does not set "type": "module".
const express = require('express');

// 2. Create the Express application instance.
//    `app` is the central object used to register routes and start the server.
const app = express();

// 2a. Enforce exact, case-sensitive route matching.
//     By default Express matches routes case-INSENSITIVELY, so `/hello` would
//     also answer `/Hello`, `/HELLO`, and so on. This tutorial's contract is a
//     single endpoint whose path is EXACTLY `/hello` (lowercase), so we opt in
//     to case-sensitive routing. With this enabled, only the exact lowercase
//     `/hello` matches; any other casing falls through to Express's built-in
//     404 response, keeping the endpoint faithful to the `/hello` contract.
app.set('case sensitive routing', true);

// 3. Resolve the TCP port the server will listen on.
//    Reading process.env.PORT lets you change the port without editing code
//    (for example: `PORT=8080 npm start`). When PORT is not set we fall back
//    to 3000 — the default port documented in the README.
const PORT = process.env.PORT || 3000;

// 4. Register the single route for this tutorial: GET /hello.
//    When a client sends `GET /hello`, this handler runs and returns the exact
//    text "Hello world":
//      - res.type('text/plain') sets Content-Type to "text/plain; charset=utf-8".
//      - res.send('Hello world') writes the body and replies with HTTP 200 OK.
//    Requests to any other path are handled by Express's built-in 404 response.
app.get('/hello', (req, res) => {
  res.type('text/plain').send('Hello world');
});

// 5. Start the HTTP server and begin listening for incoming requests.
//    Once the server is ready, log the URL so you know where to reach it.
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
