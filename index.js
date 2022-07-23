"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);
    // Using context shortcut
    ctx.leaveChat();
});
bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.message.chat.id, `test bot`);
    ctx.reply('Welcome');
});
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // Explicit usage
    ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.message.text}`);
    const request = yield fetch('https://www.mangaworld.in/api/mangas/search?keyword=Berserk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'csrf-token': 'n3E2u2zi-x9nbtcssz8k16q7nTUhfr4P8QVQ',
            'cookie': '_csrf=mj6vHO_QWgg98t04h9CSIakD; connect.sid=s%3AqbeuNEj81FkR2An4nop52TEgrNjTjVg6.FmkCNghfw6G2HnaNUxHtJNyYnktQwYVT3Khk%2F45p35k; _ga=GA1.2.3043896.1658575369; _gid=GA1.2.1371186935.1658575369'
        }
    });
    const objects = yield request.json();
    let response = [];
    if (objects.data.length > 0) {
        for (const item of objects.data) {
            response.push(item.slugFolder);
        }
    }
    ctx.telegram.answerInlineQuery('1', response);
    // Using context shortcut
    ctx.reply(`Hello ${ctx.state.role}`);
}));
bot.on('callback_query', (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id);
    // Using context shortcut
    ctx.answerCbQuery();
});
bot.on('inline_query', (ctx) => {
    const result = ['test', 'test1'];
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
    // Using context shortcut
    ctx.answerInlineQuery(result);
});
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
