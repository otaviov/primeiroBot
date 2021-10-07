// Criando teclados personalizados

const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['🐷 Porco', '🐮 Vaca', '🐐 Cabra'],
    ['🐔 Galinha', '🐣 Pintinho'],
    ['🐟 Peixe', '🦑 Polvo'],
    ['🍄 Sou vegetariano']
// o Resize vai fazer com que o teclado se redimensione para ocupar a largura da conversa 
// e o extra responsavel por renderizar o teclado
]).resize().extra()

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`)
    // Eviando pergunta..
    await ctx.reply(`Qual bebida você prefere?`, 
    // Um teclado com 3 opçoes
        Markup.keyboard(['🥤 Coca', '🧃 Suco', '🥛 Leite']).resize().oneTime().extra())
})
//Ouvir a resposta
bot.hears(['🥤 Coca', '🧃 Suco', '🥛 Leite'], async ctx => {
    await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`)
    // pegando o teclado la do inicio
    await ctx.reply(`Qual a sua carne favorita?`, tecladoCarne)
})
bot.hears('🐮 Vaca', 
    ctx =>  ctx.reply('Parece ser muito bom 😍, a minha favorita é parafuso (Eu sou um robo hehe)'))
bot.hears('🍄 Sou vegetariano', 
    ctx =>  ctx.reply('Que legal, parabens'))
// Para responder os demais que não foram declarados
bot.on('text', ctx => ctx.reply('LEGAL!'))

bot.startPolling()