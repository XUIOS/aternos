#!/bin/bash

# سكريبت لتجهيز المشروع للنشر

echo "تجهيز المشروع للنشر..."

# تثبيت التبعيات
npm install

# بناء المشروع 
npm run build

# إنشاء ملف .env إذا لم يكن موجودًا
if [ ! -f .env ]; then
  echo "PORT=5500" > .env
  echo "تم إنشاء ملف .env"
fi

echo "تم الانتهاء من تجهيز المشروع للنشر!"
echo "يمكنك الآن نشر المشروع على موقع استضافة مثل Heroku أو Railway أو Render"
echo "انظر إلى ملف README.md للحصول على تعليمات مفصلة" 