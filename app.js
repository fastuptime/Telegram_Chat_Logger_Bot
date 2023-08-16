global.config = require('./config');
global.colors = require('colors');
global.moment = require('moment');
global.fs = require('fs');
const { Telegraf } = require('telegraf');
global.bot = new Telegraf(global.config.token);

if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

bot.on('message', (ctx) => {
    if (ctx.chat.type == 'private') {
        console.log(colors.green(`[${moment().format('HH:mm:ss DD.MM.YYYY')}] > ${ctx.from.first_name} (${ctx.from.username} - ${ctx.from.id}) - ${ctx.message.text}`));
        fs.appendFile(`./logs/dm-${ctx.from.id}.txt`, `[${moment().format('HH:mm:ss DD.MM.YYYY')}] > ${ctx.from.first_name} (${ctx.from.username} - ${ctx.from.id}) - ${ctx.message.text}\n`, (err) => {
            if (err) {
                console.log(colors.red(`${moment().format('HH:mm:ss DD.MM.YYYY')} - ${ctx.from.first_name} (${ctx.from.username} - ${ctx.from.id}) - ${ctx.message.text} - Log Yazılamadı!\n${err}`));
            }
        });
    } else {
        console.log(colors.green(`[${moment().format('HH:mm:ss DD.MM.YYYY')}] > ${ctx.chat.title} - ${ctx.from.first_name} (${ctx.from.username} - ${ctx.from.id})) - ${ctx.message.text}`));
        fs.appendFile(`./logs/g${ctx.chat.id}.txt`, `[${moment().format('HH:mm:ss DD.MM.YYYY')}] > ${ctx.from.first_name} (${ctx.from.username} - ${ctx.from.id}) - ${ctx.message.text}\n`, (err) => {
            if (err) {
                console.log(colors.red(`${moment().format('HH:mm:ss DD.MM.YYYY')} - ${ctx.chat.title} - ${ctx.from.first_name} (${ctx.from.username} - ${ctx.from.id})) - ${ctx.message.text} - Log Yazılamadı!\n${err}`));
            }
        });
    }
});

bot.start((ctx) => {
    ctx.reply(`Merhaba ${ctx.from.first_name}!`);
});

bot.launch().catch((err) => {
    console.log(colors.red(`${moment().format('HH:mm:ss DD.MM.YYYY')} - Bot Başlatılamadı!\n${err}`));
});