const users = [{ name: "ali", age: 25 }];

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 1. الرابط الأساسي: /api/app
  if (req.method === 'GET' && !req.query.action) {
    return res.status(200).json({ message: 'أهلاً بيك', school: 'الزهراء' });
  }

  // 2. جلب المستخدمين: /api/app?action=users
  if (req.method === 'GET' && req.query.action === 'users') {
    return res.status(200).json(users);
  }

  // 3. إضافة بيانات: POST إلى /api/app
  if (req.method === 'POST') {
    const data = req.body; // Vercel يجهزها لك تلقائياً
    
    if (!data || !data.name) {
      return res.status(400).json({ error: 'برجاء إرسال بيانات صحيحة' });
    }

    users.push(data);
    return res.status(201).json(users);
  }

  return res.status(404).json({ error: 'مش موجود' });
};
