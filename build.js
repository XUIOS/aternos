import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// إنشاء مجلد dist إذا لم يكن موجوداً
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// نسخ ملفات TypeScript إلى مجلد dist وتغيير الامتداد إلى js
console.log('نسخ الملفات وتحويلها إلى JavaScript...');

function copyAndTransform(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyAndTransform(srcPath, path.join(destDir, file));
    } else if (file.endsWith('.ts')) {
      const destFile = file.replace('.ts', '.js');
      const destPath = path.join(destDir, destFile);
      
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // تغيير امتدادات الملفات في الاستيرادات
      content = content.replace(/from ['"](.+)\.ts['"]/g, 'from \'$1.js\'');
      
      // إزالة أنواع TypeScript
      content = content.replace(/:\s*[A-Za-z<>[\]|&]+/g, '');
      content = content.replace(/<?[A-Za-z]+>(?=\()/g, '');
      
      fs.writeFileSync(destPath, content);
      console.log(`تم تحويل ${srcPath} إلى ${destPath}`);
    } else if (file !== 'node_modules' && file !== 'dist') {
      // نسخ الملفات الأخرى كما هي
      const destPath = path.join(destDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`تم نسخ ${srcPath} إلى ${destPath}`);
    }
  }
}

// نسخ ملف config.json
if (fs.existsSync('./config.json')) {
  fs.copyFileSync('./config.json', './dist/config.json');
  console.log('تم نسخ config.json إلى مجلد dist');
}

copyAndTransform('./src', './dist');

console.log('تم الانتهاء من بناء المشروع!'); 