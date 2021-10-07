// Respondendo a textos especificos. 
// npm i --save moment  

const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)

// Respondendo a uma palavra especifica
bot.hears('pizza', ctx => ctx.reply('Quero!'))
// Respondendo a duas palvras especificas (Ele responde tanto uma como a outra)
bot.hears(['fígado', 'chuchu'], ctx => ctx.reply('Passo!'))
// Respondendo a um emoji
bot.hears('👀', ctx => ctx.reply('Ta olhando o que?'))
// expressão regular (não importa se vai escrever com letra maiúscula ou minúscula)
bot.hears(/burguer/i, ctx => ctx.reply('Quero!'))
// um array com expressoes regulares (não importa se vai escrever com letra maiúscula ou minúscula)
bot.hears([/brocolis/i, /salada/i], ctx => ctx.reply('Passo!'))
// Expressao relugar para ler uma data e retornar o dia da semana dessa data
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
    moment.locale('pt-BR')
    const data = moment(ctx.match[1], 'DD/MM/YYYY')
    ctx.reply(`${ctx.match[1]} cai em ${data.format('dddd')}`)
})

bot.startPolling()
