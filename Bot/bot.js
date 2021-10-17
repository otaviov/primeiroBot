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

bot.hears('O que são bots?', ctx =>{
    ctx.replyWithMarkdown('Os bots são aplicações autônomas que rodam na Internet enquanto desempenham algum tipo de tarefa pré-determinada. Eles podem ser úteis e inofensivos para os usuários em geral, mas também podem ser usados de forma abusiva por criminosos. Segundo pesquisa da Imperva, em 2016 os bots corresponderam a mais de 50% do tráfego total da Internet. \n_Algo mais?_', tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx =>{
    await ctx.replyWithMarkdown('No *curso* ... Não sei, isso é apenas um *teste*')
    await ctx.reply('1. Criamos um bot')
    await ctx.reply('2. nada mais')
    await ctx.replyWithMarkdown('\n _Algo mais?', tecladoOpcoes)

})

bot.hears('Posso mesmo automatizar tarefas?', async ctx =>{
    await ctx.replyWithMarkdown('Claro que sim, o bot servirá...\n Quer uma palhinha?', botoes)
    
})

bot.hears('Como comprar o curso?', ctx => {
    ctx.replyWithMarkdown('Isso é apenas um teste, não tem curso :)', tecladoOpcoes)
})

bot.action('n', ctx => {
    ctx.reply('Ok, sem problemas :)', tecladoOpcoes)

})

bot.action('s', async ctx => {
   await ctx.reply(`Legal, você poderia me enviar sua localização?`, localizacao)
})

bot.hears(/mensagem qualquer/i, async ctx =>{
    await ctx.reply('Otima piada :)', tecladoOpcoes)
})

bot.on('text', async ctx => {
    let msg = ctx.message.text
    msg = msg.split('').reverse().join('')
    await ctx.reply(`A sua mensagem, ao contrário é: ${msg}`)
    await ctx.reply('Isso é pra mostrar que eu consigo ler o que você escreve e processar sua mensagem', tecladoOpcoes)
})

bot.startPolling()