import { getProducts, getDollarBCV } from './firebase/firebaseConfig.js';
import { Telegraf } from 'telegraf';
// import fs from 'fs';

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

const telegramBot = () => {

bot.start(ctx => {
    const user = {
        "id": ctx.from.id,
        "firstName": ctx.from.first_name,
        "lastName": ctx.from.last_name,
        "fullName": `${ctx.from.first_name} ${ctx.from.last_name}`,
        "nameUser": ctx.from.username
    };

    // const logUser = `El dia ${date} el usuario ${user.fullName} a la hora ${hour} ha usado el bot \n`

    // fs.appendFile('log.txt', logUser, err => {
    //     if(err) throw err;
    //     console.log(`${user.fullName} fue agregado exitosamente!`);
    // });

let message = 
`
👋🏻 Hola <b>${user.fullName}</b>, te doy la 
bienvenida a <b>Frigorífico "La Esmeralda"</b> 🐮

🤖 Escribiendo /help encontraras una lista de comandos con los cuales podremos interactuar.
`

    // ctx.reply(message, {parse_mode : "HTML"})
    ctx.replyWithHTML(message)
})

bot.help(ctx => {

let message = 
`
🤖 ¿Qué puedo hacer por ti el día de hoy?\n
<b>/precios</b>: Te brindare información de los precios actualizados de nuestros productos. \n
<b>/horarios</b>: Conoce nuestros horarios de trabajo. \n 
<b>/delivery</b>: Conoce las zonas que cubrimos con nuestros servicios de delivery. \n  
<b>/comprar</b>: Compra en linea en horario de trabajo.        
`
    ctx.replyWithHTML(message)
})

bot.command(['precios', 'Precios', 'PRECIOS'], async ctx => {

    const products = await getProducts();
    const BCV = await getDollarBCV();
    
if(BCV) {

const { price, day, hour } = BCV;

let message = 
`
*----------| Dia: ${day} |----------*           

📌 <i>Tasa BCV:  ${price} Bs.</i>
            
📋 Lista de Precios
`

for(let product of products) {

    message += 
`  
✅  <b>${product.name}</b><i>
$ ${product.priceUSD} | Bs. ${(product.priceUSD * price).toFixed(2)}</i>
`
}

message += `
*--------| esmeraldaBot |--------*`

    ctx.replyWithHTML(message)
}

})

bot.command(['horarios', 'delivery', 'comprar'], ctx => {
    ctx.reply('Proximamente disponible') 
})    

bot.launch()
}

export { telegramBot };