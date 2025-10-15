// server.js
const connect = require('connect');
const http = require('http');
const url = require('url');

console.log('Booting server.js...'); // <-- para confirmar que corre

const app = connect();

// Log de cada request
app.use((req, _res, next) => {
  console.log('REQ:', req.method, req.url);
  next();
});

function calculate(req, res, next) {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname !== '/lab2') return next();

  const { method, x, y } = parsed.query;
  const a = Number(x);
  const b = Number(y);

  const operations = {
    add:      { fn: (a, b) => a + b, symbol: '+' },
    subtract: { fn: (a, b) => a - b, symbol: '-' },
    multiply: { fn: (a, b) => a * b, symbol: '*' },
    divide:   { fn: (a, b) => a / b, symbol: '/' },
  };

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (!operations[method]) {
    res.statusCode = 400;
    res.end('Error: method debe ser add, subtract, multiply o divide.\n');
    return;
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.statusCode = 400;
    res.end('Error: x y y deben ser números.\n');
    return;
  }

  if (method === 'divide' && b === 0) {
    res.statusCode = 400;
    res.end('Error: no se puede dividir entre 0.\n');
    return;
  }

  const { fn, symbol } = operations[method];
  const result = fn(a, b);
  res.end(`${a} ${symbol} ${b} = ${result}\n`);
}

app.use(calculate);

// 404 por defecto
app.use((req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Ruta no encontrada. Usa /lab2?method=add|subtract|multiply|divide&x=NUM&y=NUM\n');
});

// ---- Servidor HTTP con manejo de errores y puerto dinámico ----
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

const server = http.createServer(app);

server.on('error', (err) => {
  console.error('Server error:', err.message);
  // Pista típica: EADDRINUSE si el puerto está ocupado
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
