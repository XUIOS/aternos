import Mineflayer from 'mineflayer';
import fs from 'node:fs';
import path from 'node:path';
import { sleep, getRandom } from "./utils.js";

// قراءة ملف التكوين بطريقة متوافقة مع جميع إصدارات Node.js
const CONFIG = JSON.parse(fs.readFileSync(new URL('../config.json', import.meta.url), 'utf8'));

let loop;
let bot;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000; // 5 seconds

const disconnect = () => {
	if (loop) {
		clearInterval(loop);
		loop = null;
	}
	if (bot) {
		bot.quit?.();
		bot.end?.();
		bot = null;
	}
};

const reconnect = async () => {
	if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
		console.error('تم تجاوز الحد الأقصى لمحاولات إعادة الاتصال. إعادة تشغيل البوت...');
		reconnectAttempts = 0;
		await sleep(RECONNECT_DELAY);
		createBot();
		return;
	}

	console.log(`محاولة إعادة الاتصال ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS} بعد ${CONFIG.action.retryDelay / 1000} ثواني...\n`);
	reconnectAttempts++;

	disconnect();
	await sleep(CONFIG.action.retryDelay);
	createBot();
};

const createBot = () => {
	bot = Mineflayer.createBot({
		host: CONFIG.client.host,
		port: +CONFIG.client.port,
		username: CONFIG.client.username,
		version: '1.19.2',
		keepAlive: true,
		closeTimeout: 24000,
		checkTimeoutInterval: 60000
	});

	bot.once('error', error => {
		console.error(`خطأ في البوت: ${error.message}`);
		if (error.code === 'ECONNRESET') {
			console.log('تم قطع الاتصال. محاولة إعادة الاتصال...');
			reconnect();
		}
	});

	bot.once('kicked', rawResponse => {
		console.error(`تم طرد البوت: ${rawResponse}`);
		reconnect();
	});

	bot.once('end', () => {
		console.log('انتهى الاتصال. محاولة إعادة الاتصال...');
		reconnect();
	});

	bot.once('spawn', () => {
		console.log('تم تسجيل دخول البوت بنجاح!');
		reconnectAttempts = 0; // إعادة تعيين عداد المحاولات عند نجاح الاتصال

		const changePos = async () => {
			try {
				const lastAction = getRandom(CONFIG.action.commands);
				const halfChance = Math.random() < 0.5;

				console.debug(`${lastAction}${halfChance ? " مع الركض" : ''}`);

				bot.setControlState('sprint', halfChance);
				bot.setControlState(lastAction, true);

				await sleep(CONFIG.action.holdDuration);
				bot.clearControlStates();
			} catch (error) {
				console.error('خطأ في تغيير الموقع:', error.message);
			}
		};

		const changeView = async () => {
			try {
				const yaw = (Math.random() * Math.PI) - (0.5 * Math.PI);
				const pitch = (Math.random() * Math.PI) - (0.5 * Math.PI);
				await bot.look(yaw, pitch, false);
			} catch (error) {
				console.error('خطأ في تغيير الرؤية:', error.message);
			}
		};
		
		loop = setInterval(() => {
			if (bot && bot.entity) {
				changeView();
				changePos();
			}
		}, CONFIG.action.holdDuration);
	});

	bot.once('login', () => {
		console.log(`تم تسجيل دخول البوت ${bot.username}\n`);
	});
};

export default () => {
	createBot();
}; 