// Criando teclados personalizados

const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['🐷 Porco', '🐮 Vaca', '🐐 Cabra' ]
    ['🐔 Galinha', '🐣 Pintinho']
    ['🐟 Peixe', '🐙 Polvo']
    ['🍄 Sou vegetariano']
])