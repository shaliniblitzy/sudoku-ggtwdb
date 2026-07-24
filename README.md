# Hello World — Node.js / Express Tutorial

A minimal, beginner-friendly Node.js tutorial project built with the [Express](https://expressjs.com/) web framework. It exposes a single HTTP endpoint, `GET /hello`, which returns the plain-text response `Hello world`. The project is intentionally tiny so you can read every file top to bottom and understand exactly how a basic Express server is wired together.

## Prerequisites

- **Node.js `>= 18`** — Express 5 requires Node.js 18 or newer. Node.js 22 LTS ("Jod") is recommended.
- **npm** — the Node.js package manager, bundled with every Node.js installation.

You can confirm both are installed by checking their versions:

```bash
node --version
npm --version
```

## Installation

From the repository root, install the project's dependencies:

```bash
npm install
```

This reads `package.json` and installs the single runtime dependency — `express` (`^5.2.1`) — into a local `node_modules/` directory. It also generates (or reuses) `package-lock.json`, which pins the exact resolved dependency tree so that installs are reproducible.

## Running the server

Start the server with:

```bash
npm start
```

The `start` script runs `node server.js`. By default the server listens on port **3000**, and it prints a startup line telling you where to reach it:

```
Server listening on http://localhost:3000
```

The port is configurable through the `PORT` environment variable — no code changes required. For example, to run on port 8080:

```bash
PORT=8080 npm start
```

## Verifying the endpoint

With the server running, open <http://localhost:3000/hello> in your browser, or query it from another terminal with `curl`:

```bash
curl http://localhost:3000/hello
```

The response body is exactly:

```
Hello world
```

The endpoint replies with HTTP status `200 OK` and `Content-Type: text/plain; charset=utf-8`.

## How it works

`server.js` is a single, well-commented file that does four things:

- **Creates the app** — it imports Express with `const express = require('express')` and creates an application instance with `const app = express()`.
- **Registers one route** — `app.get('/hello', …)` defines the only endpoint; its handler replies with `res.type('text/plain').send('Hello world')`, which sets the plain-text `Content-Type` and sends the body with a `200 OK` status.
- **Starts listening** — it reads the port from `process.env.PORT` (defaulting to `3000`) and validates that it is a whole number between 1 and 65535. It logs the startup line shown above only once the port is successfully bound, using the actual bound port; if the port is invalid or already in use, it prints a concise error and exits with a nonzero status instead of falsely reporting success.
- **Handles everything else** — routing is configured to be both **case-sensitive** and **strict**, so only the exact lowercase path `/hello` matches. Any other request — a different casing such as `/Hello`, a trailing-slash variant such as `/hello/`, or an unrelated path such as `/goodbye` — falls through to Express 5's built-in `404 Not Found` response.

---

Created by Blitzy
