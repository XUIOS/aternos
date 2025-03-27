import Mineflayer from 'mineflayer';
import { sleep, getRandom } from "./utils.js";
import CONFIG from "../config.json";

let loop;
let bot;

const disconnect = () => {
	clearInterval(loop);
	bot?.quit?.();
	bot?.end?.();
};
const reconnect = async () => {
	console.log(`Trying to reconnect in ${CONFIG.action.retryDelay / 1000} seconds...\n`);

	disconnect();
	await sleep(CONFIG.action.retryDelay);
	createBot();
	return;
};

const createBot = () => {
	bot = Mineflayer.createBot({
		host: CONFIG.client.host,
		port: +CONFIG.client.port,
		username: CONFIG.client.username
	});


	bot.once('error', error => {
		console.error(`AFKBot got an error: ${error}`);
	});
	bot.once('kicked', rawResponse => {
		console.error(`\n\nAFKbot is disconnected: ${rawResponse}`);
	});
	bot.once('end', () => reconnect());

	bot.once('spawn', () => {
		const changePos = async () => {
			const lastAction = getRandom(CONFIG.action.commands);
			const halfChance = Math.random() < 0.5 ? true : false; // 50% chance to sprint

			console.debug(`${lastAction}${halfChance? " with sprinting" : ''}`);

			bot.setControlState('sprint', halfChance);
			bot.setControlState(lastAction, true); // starts the selected random action

			await sleep(CONFIG.action.holdDuration);
			bot.clearControlStates();
			return;
		};
		const changeView = async () => {
			const yaw = (Math.random() * Math.PI) - (0.5 * Math.PI),
				pitch = (Math.random() * Math.PI) - (0.5 * Math.PI);
			
			await bot.look(yaw, pitch, false);
			return;
		};
		
		loop = setInterval(() => {
			changeView();
			changePos();
		}, CONFIG.action.holdDuration);
	});
	bot.once('login', () => {
		console.log(`AFKBot logged in ${bot.username}\n\n`);
	});
};

export default () => {
	createBot();
}; 