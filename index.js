const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'chakra-kreeti' }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from chakra-kreeti!', timestamp: new Date().toISOString() }));
});

server.listen(PORT, () => {
  console.log(`chakra-kreeti listening on port ${PORT}`);
});