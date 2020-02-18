const _ = require("log-timestamp");
const express = require("express");
const path = require('path');
const app = express();
const port = 80;

// Link to /api/down 
app.get('/', (_, res) => res.sendFile(path.join(__dirname + '/index.html')));

// Health endpoint.. doesnt really check anything in this case
app.get("/api/health", (_, res) => res.json({ alive: true }));

// Shuts down the app
app.get("/api/down", (_, res) => 
{
    res.json({ shutdown: true });
    process.kill(process.pid, "SIGTERM");
});

// Serve index on 404 routes
app.get('*', (_, res) => res.sendFile(path.join(__dirname + '/index.html')));

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

process.on("SIGINT", () => shutDown());
process.on("SIGTERM", () => shutDown());

const shutDown = () => {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => process.exit(0));
};
