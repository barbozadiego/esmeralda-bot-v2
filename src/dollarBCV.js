import moment from 'moment';
import 'moment/locale/es.js';
import puppeteer from 'puppeteer';

import { addDollarBCV } from './firebase/firebaseConfig.js';

const queryHours = {
    "eightMorning": moment('08:00:00 AM','hh:mm:ss A').format('hh:mm:ss A'),
    "nineMorning": moment('09:03:00 AM','hh:mm:ss A').format('hh:mm:ss A'),
    "oneAfternoon": moment('01:03:00 PM','hh:mm:ss A').format('hh:mm:ss A'),
    "fiveAfternoon": moment('05:00:00 PM','hh:mm:ss A').format('hh:mm:ss A')
};

const getPriceDollarBCV = async () => {
    const browser = await puppeteer.launch({
             headless: true,
             args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                   ] 
        });
    const page = await browser.newPage();
    
    page.setDefaultNavigationTimeout(0);

    await page.goto('http://www.bcv.org.ve');

    const priceBCV = await page.evaluate(() => {
        let priceDollar = document.querySelector('#dolar .col-sm-6.col-xs-6 strong').textContent;
            priceDollar = priceDollar.replace(',','.');
            priceDollar = parseFloat(priceDollar, 10).toFixed(2);

        return priceDollar
    });

    // add data to firebase
    addDollarBCV({
        "price": priceBCV,
        "day": moment().format('L'),
        "hour": moment().utcOffset(-240).format('hh:mm A')
    })

    await browser.close();
};

const initializeScrape = () => {
    const now = moment().utcOffset(-240).format('hh:mm:ss A');
    const { eightMorning, nineMorning, oneAfternoon, fiveAfternoon } = queryHours;
    
    if(now === eightMorning || now === nineMorning || now === oneAfternoon || now === fiveAfternoon ) {
        getPriceDollarBCV()
        console.log('consultando...')
    }
};


export { initializeScrape }; 

