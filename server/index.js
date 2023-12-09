const TelegramBot = require('node-telegram-bot-api')
const token = '6886269433:AAHbu7y2mrf1IjfgQ4Z_9nEYNkW5jjIlebM'

const bot = new TelegramBot(token, { polling: true })

const bootstrap = () => {
  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    if(text === '/start'){
      await bot.sendMessage(chatId, 'Telegram Web Botiga xush kelibsiz',
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: 'View all products',
                web_app: {
                  url: 'https://telegram-web-bot-client.vercel.app/',
                }
              }
            ]
          ]
        }
      }
      )
    }
  })
}

bootstrap();










































































