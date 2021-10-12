const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require ('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf (env.token)

const tecladoOpcoes = Markup.keyboard([
    ['O que são bots?', 'O que verei no curso?'],
    ['Posso mesmo automatizar tarefas?'],
    ['Como comprar o curso?']

]).resize().extra()

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')

], {columns: 2}))

const localizacao = Markup.keyboard([
    Markup.locationRequestButton('Clique aqui para enviar sua localização')

]).resize().oneTime().extra()

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o chatBot do curso`)
    await ctx.replyWithPhoto('https://i.pinimg.com/564x/22/0e/30/220e30d05c95d2d369d3b840b01ca9fc.jpg')
    await ctx.replyWithMarkdown(`_POsso te ajudar em algo?_`, tecladoOpcoes)

})

bot.startPolling()