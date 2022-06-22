import 'dotenv/config';
// const dotenv = 'dotenv';

import { initializeScrape } from './src/dollarBCV.js';
import { telegramBot } from './src/telegramBot.js';


setInterval(initializeScrape, 1000);
telegramBot()






