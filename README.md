# Aterbot

روبوت يعمل على الحفاظ على اتصال خادم Minecraft.

## طريقة الاستخدام

1. قم بتعديل ملف `config.json` بإعدادات خادمك الخاص
2. قم بتثبيت التبعيات:
```
npm install
```
3. قم ببناء المشروع:
```
npm run build
```
4. تشغيل البوت:
```
npm start
```

## كيفية النشر على Replit

1. قم بإنشاء مستودع جديد على Replit
2. قم بنسخ محتويات هذا المشروع إلى المستودع
3. قم بتعديل ملف `config.json` بإعدادات خادمك
4. اضغط على زر "Run" في Replit

### للحفاظ على تشغيل البوت على Replit

1. قم بإنشاء حساب في [UptimeRobot](https://uptimerobot.com/)
2. قم بإضافة موقع جديد
3. أدخل رابط موقعك على Replit
4. اضبط الفاصل الزمني على 5 دقائق

## كيفية النشر على مواقع الاستضافة الأخرى

### Heroku
1. قم بإنشاء حساب في Heroku: https://signup.heroku.com/
2. قم بتثبيت Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
3. قم بتسجيل الدخول:
```
heroku login
```
4. قم بإنشاء تطبيق جديد:
```
heroku create اسم-تطبيقك
```
5. قم برفع المشروع:
```
git push heroku main
```

### Railway
1. قم بالتسجيل في Railway: https://railway.app/
2. قم بإنشاء مشروع جديد من GitHub
3. قم بتحديد مستودع GitHub الخاص بك
4. اترك الإعدادات الافتراضية واضغط على "Deploy"

### Render
1. قم بالتسجيل في Render: https://render.com/
2. قم بإنشاء "Web Service" جديد
3. قم بتوصيل حساب GitHub واختر المستودع
4. حدد الإعدادات:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. اضغط على "Create Web Service"

# AterBot ✨  
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](/LICENSE)  
### Keep your Aternos server alive 24/7.
Please star this project <3  
<br/>



# Important Notice 📢
### This project will be unmaintained until at least 2024.<br/>But you can use it as usual.



# Requirements 🎒
1. A Replit account.  
	Sign up at: https://replit.com/signup

2. An UptimeRobot account.  
	Sign up at: https://uptimerobot.com/signUp

3. A Minecraft server you owned.  
	Make sure your server settings ``online-mode`` set to ``false``!  
	And you should have an OP permission!



# Setup ⚙
1. Join your server.
2. Build a bedrock room somewhere, and stay in there.  
(Recommended room size: `X5 Y3 Z5`)
3. Go to [Replit](https://replit.com/).
4. Click `+` at the top right, click `Import from GitHub` at the close button.
5. Put `https://github.com/JadeMin/aterbot.git` into `GitHub URL`, click `Create Repl`.
6. Click `Run` at the top, your bot will join your server.  
7. **Teleport the bot into the bedrock room, change the bot's gamemode to `Creative` to not die!**
8. You'll see the `Webview` tab on Repl, copy the url.
10. Go to [UptimeRobot](https://uptimerobot.com/dashboard).
11. Click `Add New Monitor`, select `Monitor Type` to `HTTP(s)`.
12. Paste the url copied in `Step 8` into `URL (or IP)`.
13. Click `Create Monitor` 2 times.

Finally... DONE! Enjoy your free 24/7 Aternos server.



# FAQ ❓
> #### Q1: My bot leaves immediately when I close the Repl page.
<details><summary>A1:</summary>

Repl projects are automatically turned off when close the window, or after 5 minutes of inactivity.  
And UptimeRobot trying to wake it up in every 5 minutes.  
So you can just leave it even if it's not working for a while.  
</details>

<hr/>

> #### Q2: How to fix `unsupported/unknown protocol version: ###, update minecraft-data`?
<details><summary>A2:</summary>

This project is using the `mineflayer` module.  
**It may not supported on your server version yet.**  
I'm trying to periodically check for updates, so please be patient.
</details>

<hr/>

> #### Q3: How to fix `Invalid move player packet received`?
<details><summary>A3:</summary>

It seems your bot escaped from the bedrock room.    
So you have to wipe the playerdata in your server.  
1. Go to the management page of your Aternos server.
2. Click `Files` in the left section.
3. Delete the `world/playerdata/<UUID>.dat`, `<UUID>.dat_old` file. (the UUID is your bot's UUID)
4. Restart the bot.

**Lock the bot somewhere as soon as possible!**  
**And change the bot's gamemode to `Creative` to not die.**
</details>

<hr/>

> #### Q4: My bot leaves permanently after n hours.
<details><summary>A4:</summary>

Aternos automatically bans AFK players from your server.  
So just unban your bot, if it's banned.
</details>



# CAUTION ⚠
### Aternos might detect your suspicious actions and delete your account!  
**By using this, you acknowledge that you're responsible for any problems arise.**  