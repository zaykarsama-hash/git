const users = [{ name: "ali", age: 25 }];

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const url = req.url.split('?')[0];

  if (req.method === 'GET' && url === '/api/app') {
    return res.status(200).json({ message: 'أهلاً بيك', school: 'الزهراء' });
  }

  if (req.method === 'GET' && url === '/api/app/users') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST' && url === '/api/app/data') {
    const data = req.body;

    if (!data || !data.name) {
      return res.status(400).json({ error: 'برجاء إرسال بيانات صحيحة بصيغة JSON' });
    }

    users.push(data);
    return res.status(201).json(users);
  }

  return res.status(404).json({ error: 'مش موجود' });
};
