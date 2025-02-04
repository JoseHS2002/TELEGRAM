// sendMessage.js
const fetch = require('node-fetch');

// Obtener el token del bot y el ID del chat desde los argumentos del terminal
const BOT_TOKEN = 'TU_BOT_TOKEN_AQUI';
const CHAT_ID = 'TU_CHAT_ID_AQUI';
const MESSAGE = process.argv[2]; // El mensaje se recibe como argumento

if (!MESSAGE) {
    console.error('Por favor, proporciona un mensaje como argumento.');
    process.exit(1);
}

// Función para enviar el mensaje
const sendMessage = async (chatId, message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });

    const data = await response.json();

    if (data.ok) {
        console.log(`Mensaje enviado: ${data.result.text}`);
    } else {
        console.error(`Error al enviar mensaje: ${data.description}`);
    }
};

// Llamar a la función para enviar el mensaje
sendMessage(CHAT_ID, MESSAGE);

/*
const Telegraf = require('telegraf');

const bot = new Telegraf('1203320499:AAFEhs6__ypKptwfTjfS88HaRTH0-lxmVOU')

bot.use((ctx, next) => {
  ctx.reply('usaste el bot');
  // next();
  ctx.state.users = 75;
  next(ctx); //next is passed because we can modify data
})

bot.start((ctx) => {
  // ctx.reply('Welcome');
  // console.log(ctx)
  // console.log(ctx.from)
  // console.log(ctx.chat)
  // console.log(ctx.message)
  // console.log(ctx.updateSubTypes)
  console.log(ctx.updateSubTypes[0])

  // ctx.reply(`Welcome ${ctx.from.first_name} ${ctx.from.last_name}`)
  // ctx.reply(`Total Users: ${ctx.state.users}`) // shurtcuts does not require id

  // shortcuts avoid to write the following
  // bot.telegram.sendMessage(ctx.chat.id, 'hello world', [extra]);
  bot.telegram.sendMessage(ctx.chat.id, 'hello world');
  // bot.telegram.sendMessage(ctx.chat.id, '**hello world**', {
  //   parse_mode: 'Markdown',
  //   disable_notification: true
  // });
})

bot.help(ctx => ctx.reply('help command'))

bot.settings(ctx => ctx.reply('settings command'))

// Custom Command
// to avoid case sensitive commando you can put in an array some variations
bot.command(['mytest', 'Mytest', 'test'], (ctx) => {
  ctx.reply('my custom command');
})

// hears
// This wont work on groups, so you will have to turn off 'privacy group'
bot.hears('computer', ctx => {
  ctx.reply('Hey I am selling a computer!!!');
})

// bot.on('text', ctx => {
//   ctx.reply('text message');
// });

// bot.on('sticker', ctx => {
//   ctx.reply('oh! you like stickers')
// })


// this methods can be recognized inside a long text
bot.mention('BotFather', (ctx) => {
  ctx.reply('you mentioned someone')
})

bot.phone('+1 730 263-4233', (ctx) => {
  ctx.reply('this is a phone')
});

bot.hashtag('coding', (ctx) => {
  ctx.reply('hashtag!')
})



bot.launch()
*/
