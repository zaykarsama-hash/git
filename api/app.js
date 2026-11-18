import { db } from '../firebase.js';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const url = req.url.split('?')[0];

  try {
    // 1. الرابط الأساسي: /api/app
    if (req.method === 'GET' && url === '/api/app') {
      return res.status(200).json({ message: 'أهلاً بيك', school: 'الزهراء' });
    }

    // 2. جلب كل المستخدمين من قاعدة البيانات: /api/app/users
    if (req.method === 'GET' && url === '/api/app/users') {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return res.status(200).json(usersList);
    }

    // 3. إضافة مستخدم جديد لقاعدة البيانات: /api/app/data
    if (req.method === 'POST' && url === '/api/app/data') {
      const data = req.body;

      if (!data || !data.name) {
        return res.status(400).json({ error: 'برجاء إرسال بيانات صحيحة بصيغة JSON' });
      }

      const docRef = await addDoc(collection(db, 'users'), data);
      return res.status(201).json({
        message: 'تم الحفظ بنجاح في Firebase',
        id: docRef.id,
        data: data
      });
    }

    return res.status(404).json({ error: 'المسار غير موجود' });

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ في السيرفر', details: error.message });
  }
}
