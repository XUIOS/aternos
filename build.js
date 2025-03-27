import fs from 'fs';
import path from 'path';

// إنشاء مجلد dist إذا لم يكن موجوداً
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

console.log('نسخ الملفات المبسطة إلى مجلد dist...');

// نسخ الملفات المبسطة المجهزة مسبقاً
const files = [
  { src: 'src/index-simple.js', dest: 'dist/index.js' },
  { src: 'src/bot-simple.js', dest: 'dist/bot.js' },
  { src: 'src/utils-simple.js', dest: 'dist/utils.js' },
  { src: 'src/web-simple.js', dest: 'dist/web.js' }
];

for (const file of files) {
  if (fs.existsSync(file.src)) {
    // قراءة محتوى الملف
    let content = fs.readFileSync(file.src, 'utf8');
    
    // تعديل مسارات الاستيراد لإزالة -simple من المسارات
    content = content.replace(/from ["']\.\/([a-z-]+)-simple\.js["']/g, 'from "./$1.js"');
    
    // كتابة المحتوى المعدل إلى الملف الهدف
    fs.writeFileSync(file.dest, content);
    console.log(`تم نسخ وتعديل ${file.src} إلى ${file.dest}`);
  } else {
    console.error(`خطأ: الملف ${file.src} غير موجود`);
  }
}

// نسخ ملف config.json
if (fs.existsSync('./config.json')) {
  fs.copyFileSync('./config.json', './dist/config.json');
  console.log('تم نسخ config.json إلى مجلد dist');
}

console.log('تم الانتهاء من بناء المشروع!'); 