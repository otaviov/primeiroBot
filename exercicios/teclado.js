// Criando teclados personalizados

const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['ð· Porco', 'ð® Vaca', 'ð Cabra'],
    ['ð Galinha', 'ð£ Pintinho'],
    ['ð Peixe', 'ð¦ Polvo'],
    ['ð Sou vegetariano']
// o Resize vai fazer com que o teclado se redimensione para ocupar a largura da conversa 
// e o extra responsavel por renderizar o teclado
]).resize().extra()

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`)
    // Eviando pergunta..
    await ctx.reply(`Qual bebida vocÃª prefere?`, 
    // Um teclado com 3 opÃ§oes
        Markup.keyboard(['ð¥¤ Coca', 'ð§ Suco', 'ð¥ Leite']).resize().oneTime().extra())
})
//Ouvir a resposta
bot.hears(['ð¥¤ Coca', 'ð§ Suco', 'ð¥ Leite'], async ctx => {
    await ctx.reply(`Nossa! Eu tambÃ©m gosto de ${ctx.match}`)
    // pegando o teclado la do inicio
    await ctx.reply(`Qual a sua carne favorita?`, tecladoCarne)
})
bot.hears('ð® Vaca', 
    ctx =>  ctx.reply('Parece ser muito bom ð, a minha favorita Ã© parafuso (Eu sou um robo hehe)'))
bot.hears('ð Sou vegetariano', 
    ctx =>  ctx.reply('Que legal, parabens'))
// Para responder os demais que nÃ£o foram declarados
bot.on('text', ctx => ctx.reply('LEGAL!'))

bot.startPolling()