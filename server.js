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

// 2a. Enforce exact route matching (case-sensitive AND strict).
//     By default Express matches routes case-INSENSITIVELY and treats a
//     trailing slash as optional, so a plain `/hello` route would also answer
//     `/Hello`, `/HELLO`, and `/hello/`. This tutorial's contract is a single
//     endpoint whose path is EXACTLY `/hello` (lowercase, no trailing slash),
//     so we opt in to BOTH matching options before registering any route:
//       - 'case sensitive routing' treats `/hello` and `/Hello` as different,
//         so only the lowercase spelling matches.
//       - 'strict routing' treats `/hello` and `/hello/` as different, so the
//         trailing-slash form does NOT match.
//     With both enabled, only the exact path `/hello` matches; every other
//     variation (a different casing or a trailing slash) falls through to
//     Express's built-in 404 response, keeping the endpoint faithful to the
//     `/hello` contract.
app.set('case sensitive routing', true);
app.set('strict routing', true);

// 3. Resolve and validate the TCP port the server will listen on.
//    Reading process.env.PORT lets you change the port without editing code
//    (for example: `PORT=8080 npm start`). When PORT is unset or empty we fall
//    back to 3000 — the default port documented in the README.
//
//    A TCP port must be a whole number between 1 and 65535, so we validate the
//    value up front and fail fast with a clear, one-line message when it is
//    invalid. Without this check Node would react confusingly: an out-of-range
//    value (e.g. PORT=65536) crashes with a long stack trace, while a
//    non-numeric value (e.g. PORT=foo) is treated as a file path and silently
//    binds a Unix-domain socket instead of a TCP port — neither is helpful in a
//    tutorial. Validating here keeps startup behavior predictable and honest.
const DEFAULT_PORT = 3000;
const rawPort = process.env.PORT;
let PORT;
if (rawPort === undefined || rawPort === '') {
  // PORT not provided (or empty): use the documented default.
  PORT = DEFAULT_PORT;
} else {
  PORT = Number(rawPort);
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error(
      `Invalid PORT "${rawPort}": expected an integer between 1 and 65535.`
    );
    process.exit(1);
  }
}

// 4. Register the single route for this tutorial: GET /hello.
//    When a client sends `GET /hello`, this handler runs and returns the exact
//    text "Hello world":
//      - res.type('text/plain') sets Content-Type to "text/plain; charset=utf-8".
//      - res.send('Hello world') writes the body and replies with HTTP 200 OK.
//    Requests to any other path — including a different casing (`/Hello`) or a
//    trailing slash (`/hello/`) — do not match and receive Express's built-in
//    404 response.
app.get('/hello', (req, res) => {
  res.type('text/plain').send('Hello world');
});

// 5. Start the HTTP server and begin listening for incoming requests.
//    app.listen() returns the underlying Node.js http.Server. Because binding
//    to a port happens asynchronously, we handle its two possible outcomes
//    explicitly instead of assuming success:
//      - 'listening' fires once the socket is actually bound. Only THEN do we
//        log the URL, and we read the real port back from server.address() so
//        the printed URL is always the one you can actually connect to.
//      - 'error' fires when binding fails — most commonly EADDRINUSE, when the
//        chosen port is already in use. We print a concise message and exit
//        with a nonzero status so the failure is honest and easy to detect,
//        rather than falsely logging that the server started.
const server = app.listen(PORT);

server.on('listening', () => {
  const { port } = server.address();
  console.log(`Server listening on http://localhost:${port}`);
});

server.on('error', (err) => {
  console.error(`Failed to start server on port ${PORT}: ${err.message}`);
  process.exit(1);
});
