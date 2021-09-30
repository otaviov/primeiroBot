const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem-vindo, ${name}! 😎🤙`)
    // Destacando texto em itálico e azul
    await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b>
        <i>de várias</i> <code>formas</code> <pre>possíveis</pre>
        <a href="http://www.google.com">Google</a> `)
    // Destacando texto em negrito, italico e azul
    await ctx.replyWithMarkdown('Destacando mensagem *Markdown*'
        + ' _de várias_ `formas` ```possíveis```'
        + ' [Google](http://www.google.com)')
    // Enviando foto: 
    await ctx.replyWithPhoto({source: `${__dirname}/cat.jpg`})
    // Enviando foto a partir de uma URL
    await ctx.replyWithPhoto('https://i.pinimg.com/564x/ac/03/98/ac03988834695cc2f6eb623a74143355.jpg',
        {caption: 'Olha que fofura!!'})
    // Enviando video a partir de uma URL
    await ctx.replyWithVideo('')
})

bot.startPolling()