const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const cors = require('cors')

const token = '6886269433:AAHbu7y2mrf1IjfgQ4Z_9nEYNkW5jjIlebM'

const bot = new TelegramBot(token, { polling: true })

const app = express();

app.use(express.json())
app.use(cors());

const bootstrap = () => {

  bot.setMyCommands([
    {
      command: '/start',
      description: 'Xush Kelibsiz'
    },
    {
      command: '/cources',
      description: 'Barcha productlarni ko\'rish'
    }
  ])

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

    if(text === '/cources'){
      await bot.sendMessage(
        chatId,
        'All courses',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Kurslarni ko\'rish',
                  web_app: {
                    url: 'https://telegram-web-bot-client.vercel.app',
                  }
                }
              ]
            ]
          }
        }
      )
    }

    if(msg.web_app_data?.data){
      try {
        const data = JSON.parse(msg.web_app_data?.data)
        await bot.sendMessage(chatId, "Siz mahsulotni muvovaqqiyatli sotib oldingiz")
        for(item of data){
          await bot.sendPhoto(chatId, item.Image)
          await bot.sendMessage(
            chatId,
            `${item.title} - ${item.quantity}x`
          )
        }

        await bot.sendMessage(
          chatId,
          `Umumiy narx: ${data.reduce((a,c) => a + c.price * c.quantity,0).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`
        )
      } catch (error) {
        console.log(error)
      }
    }
  })
}

bootstrap();

app.post('/web-data',async (req, res) => {

})

app.listen(process.env.PORT || 8000, () => console.log('Port listening successfuly'))







































































