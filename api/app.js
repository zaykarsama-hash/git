const http = require('http');

const users =[
  {
    name:"ali", 
    age:25
  }
] 

export default function handler(req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // GET - بيرجع JSON
  if (req.method === 'GET' && req.url === '/') {
    res.end(JSON.stringify({ message: 'أهلاً بيك', school: 'الزهراء' }));
    return;
  }
  if (req.method === 'GET' && req.url === '/users') {
    res.end(JSON.stringify(users));
    return;
  }

  // POST - بيستقبل JSON
  if (req.method === 'POST' && req.url === '/data') {
    let body ="";

    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body); // حول النص لـ Object
      users.push(body);
      res.end(JSON.stringify(users));
    });
    return;
  }

  res.end(JSON.stringify({ error: 'مش موجود' }));
};
