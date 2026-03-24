// server.js

// This line is like going to the Node.js supply closet and getting the
// "http" toolkit. We store all its tools in the 'http' variable.
const http = require('http');
    
// This line creates a new HTTP server. The function passed to createServer
// will run for every single request that comes in.
const server = http.createServer((req, res) => {
  // 1. Prepare a "Success" response with a plain text content type.
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // 2. Write "Hello, World!" and send the response.
  res.end('Hello, World!');
});

const PORT = 3000;
// Open for business! Start listening for visitors on our chosen port.
server.listen(PORT, () => {
  // This is a callback that runs once the server successfully starts listening.
  // It's just for us, the developers, to see in our terminal.
  console.log(`Greeting Booth is open at http://localhost:${PORT}/`);
});