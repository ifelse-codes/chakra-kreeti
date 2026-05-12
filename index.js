const http = require('http');

const PORT = process.env.PORT || 3000;

function log(method, url, statusCode) {
  console.log(`[${new Date().toISOString()}] ${method} ${url} -> ${statusCode}`);
}

const users = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', role: 'admin' },
  { id: 2, name: 'Priya Mehta', email: 'priya@example.com', role: 'editor' },
  { id: 3, name: 'Rohan Das', email: 'rohan@example.com', role: 'viewer' },
];

const products = [
  { id: 1, name: 'Chakra UI Pro', price: 49.99, category: 'software', inStock: true },
  { id: 2, name: 'Design System Kit', price: 29.99, category: 'design', inStock: true },
  { id: 3, name: 'Component Library', price: 19.99, category: 'software', inStock: false },
];

const orders = [
  { id: 101, userId: 1, productId: 1, quantity: 2, status: 'delivered', total: 99.98 },
  { id: 102, userId: 2, productId: 3, quantity: 1, status: 'pending', total: 19.99 },
  { id: 103, userId: 3, productId: 2, quantity: 1, status: 'shipped', total: 29.99 },
];

function send(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/healthz') {
    log(method, url, 200);
    send(res, 200, { status: 'ok', service: 'chakra-kreeti', uptime: process.uptime() });
    return;
  }

  if (url === '/') {
    log(method, url, 200);
    send(res, 200, { message: 'Hello from chakra-kreeti!', timestamp: new Date().toISOString() });
    return;
  }

  if (url === '/users') {
    log(method, url, 200);
    send(res, 200, { count: users.length, data: users });
    return;
  }

  if (url === '/products') {
    log(method, url, 200);
    send(res, 200, { count: products.length, data: products });
    return;
  }

  if (url === '/orders') {
    log(method, url, 200);
    send(res, 200, { count: orders.length, data: orders });
    return;
  }

  if (url === '/stats') {
    const stats = {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
      revenue: orders.reduce((sum, o) => sum + o.total, 0).toFixed(2),
      pendingOrders: orders.filter(o => o.status === 'pending').length,
    };
    log(method, url, 200);
    send(res, 200, { timestamp: new Date().toISOString(), stats });
    return;
  }

  log(method, url, 404);
  send(res, 404, { error: 'Not Found', path: url });
});

server.listen(PORT, () => {
  console.log(`chakra-kreeti listening on port ${PORT}`);
});
