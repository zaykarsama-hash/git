const http = require('http');

export default async function handler((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // GET - بيرجع JSON
  if (req.method === 'GET' && req.url === '/') {
    res.end(JSON.stringify({ message: 'أهلاً بيك', school: 'الزهراء' }));
    return;
  }

  // POST - بيستقبل JSON
  if (req.method === 'POST' && req.url === '/data') {
    let body = '';

    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body); // حول النص لـ Object

      res.end(JSON.stringify({
        message: 'وصلني',
        name: data.name,
        age: data.age
      }));
    });
    return;
  }

  res.end(JSON.stringify({ error: 'مش موجود' }));
});
