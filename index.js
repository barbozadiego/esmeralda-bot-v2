import 'dotenv/config';
// const dotenv = 'dotenv';

import { initializeScrape } from './src/dollarBCV.js';
import { telegramBot } from './src/telegramBot.js';


setInterval(initializeScrape, 1000);
telegramBot()


const systemDate = moment().utcOffset() 
const now = moment().utcOffset(systemDate).format('hh:mm:ss A');

console.log(`Sistema iniciado`)
console.log(`UTC ${systemDate}`)
console.log(`Now ${now}`)




